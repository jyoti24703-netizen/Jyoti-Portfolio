import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useTourManager from "./TourManager";
import SpeechBubble from "./SpeechBubble";
import { TOUR_STEPS, getAnchorPosition, getSectionElement } from "./SectionAnchors";

const MASCOT_SIZE = { width: 180, height: 230 };

const MascotController = () => {
  const shellRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const guideSectionRef = useRef("");
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);

  const [mode, setMode] = useState("passive");
  const [message, setMessage] = useState("I am relaxing here. Click Start Tour when you want a guide.");
  const [isMuted, setIsMuted] = useState(true);
  const [spotlightSection, setSpotlightSection] = useState("");
  const [activeStepTitle, setActiveStepTitle] = useState("");

  const {
    stepIndex,
    activeStep,
    isGuideActive,
    isPaused,
    setIsPaused,
    visitedSections,
    markSectionVisited,
    tourCompleted,
    startGuide,
    exitGuide,
    replayGuide,
    nextStep,
  } = useTourManager();

  const isFloating = isGuideActive;
  const teddyMotionClass = isGuideActive ? "teddy-guide-active" : "teddy-resting";

  const moveToSection = (sectionId) => {
    targetRef.current = getAnchorPosition(sectionId, MASCOT_SIZE);
  };

  useEffect(() => {
    const onMouseMove = (event) => {
      cursorRef.current = { x: event.clientX, y: event.clientY };

      if (!isFloating) {
        const rect = shellRef.current?.getBoundingClientRect();
        if (!rect) return;

        const localX = Math.max(-2.2, Math.min(2.2, (event.clientX - (rect.left + 88)) / 36));
        const localY = Math.max(-1.8, Math.min(1.8, (event.clientY - (rect.top + 90)) / 40));

        if (leftEyeRef.current) {
          leftEyeRef.current.setAttribute("cx", String(76 + localX));
          leftEyeRef.current.setAttribute("cy", String(88 + localY));
        }
        if (rightEyeRef.current) {
          rightEyeRef.current.setAttribute("cx", String(104 + localX));
          rightEyeRef.current.setAttribute("cy", String(88 + localY));
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isFloating]);

  useEffect(() => {
    if (!isFloating) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const rect = shellRef.current?.getBoundingClientRect();
    const startX = rect?.left ?? 16;
    const startY = rect?.top ?? window.innerHeight - MASCOT_SIZE.height - 20;

    currentRef.current = { x: startX, y: startY };
    targetRef.current = { x: startX, y: startY };

    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;
      const distance = Math.hypot(dx, dy);

      const spring = distance > 260 ? 0.08 : 0.13;
      const damping = distance > 260 ? 0.78 : 0.84;

      velocityRef.current.x = velocityRef.current.x * damping + dx * spring;
      velocityRef.current.y = velocityRef.current.y * damping + dy * spring;

      currentRef.current.x += velocityRef.current.x;
      currentRef.current.y += velocityRef.current.y;

      if (shellRef.current) {
        shellRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }

      const eyeX = Math.max(-2.8, Math.min(2.8, (cursorRef.current.x - (currentRef.current.x + 95)) / 34));
      const eyeY = Math.max(-2.2, Math.min(2.2, (cursorRef.current.y - (currentRef.current.y + 92)) / 36));

      if (leftEyeRef.current) {
        leftEyeRef.current.setAttribute("cx", String(76 + eyeX));
        leftEyeRef.current.setAttribute("cy", String(88 + eyeY));
      }
      if (rightEyeRef.current) {
        rightEyeRef.current.setAttribute("cx", String(104 + eyeX));
        rightEyeRef.current.setAttribute("cy", String(88 + eyeY));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isFloating]);

  useEffect(() => {
    if (tourCompleted && !isGuideActive) {
      setMessage("Welcome back. I am resting here. Click Start Tour anytime.");
    }
  }, [tourCompleted, isGuideActive]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;

    window.speechSynthesis.cancel();
    if (isMuted || !isGuideActive || !message) return undefined;

    const spokenText = message.replace(/Step\s+\d+\s+of\s+\d+\.?\s*/i, "");
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 0.95;
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isGuideActive, isMuted, message]);

  useEffect(() => {
    if (!isGuideActive) {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
      guideSectionRef.current = "";
      setMode("passive");
      setSpotlightSection("");
      document.body.classList.remove("teddy-guide-mode");
      if (shellRef.current) shellRef.current.style.transform = "";
      if (!tourCompleted) {
        setMessage("I am relaxing here. Click Start Tour when you want a guide.");
      }
      setActiveStepTitle("");
      return;
    }

    setMode("guide");
    const step = activeStep;
    if (!step) return;

    guideSectionRef.current = step.id;
    setActiveStepTitle(step.title);
    setSpotlightSection(step.id);
    moveToSection(step.id);

    const sectionElement = getSectionElement(step.id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    markSectionVisited(step.id);
    setMessage(
      `Step ${stepIndex + 1} of ${TOUR_STEPS.length}. You are now in the ${step.title} section. ${step.lines.join(" ")}`
    );
  }, [activeStep, isGuideActive, markSectionVisited, stepIndex, tourCompleted]);

  useEffect(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (!isGuideActive || isPaused) return undefined;

    if (stepIndex >= TOUR_STEPS.length - 1) {
      setMessage("Tour completed. Press Replay to start again or Exit to close.");
      return undefined;
    }

    autoAdvanceTimerRef.current = setTimeout(() => {
      nextStep();
    }, 4200);

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
    };
  }, [isGuideActive, isPaused, nextStep, stepIndex]);

  useEffect(() => {
    const previous = document.querySelector(".teddy-spotlight");
    if (previous) previous.classList.remove("teddy-spotlight");

    if (spotlightSection) {
      const section = getSectionElement(spotlightSection);
      if (section) section.classList.add("teddy-spotlight");
    }

    document.body.classList.toggle("teddy-guide-mode", isGuideActive);

    return () => {
      const current = document.querySelector(".teddy-spotlight");
      if (current) current.classList.remove("teddy-spotlight");
      document.body.classList.remove("teddy-guide-mode");
    };
  }, [isGuideActive, spotlightSection]);

  const teddyContent = (
    <div className="pointer-events-none relative w-[180px]">
      <SpeechBubble
        message={message}
        mode={mode}
        isGuideActive={isGuideActive}
        isPaused={isPaused}
        isMuted={isMuted}
        sectionTitle={activeStepTitle}
        onStart={startGuide}
        onNext={nextStep}
        onPause={() => setIsPaused((prev) => !prev)}
        onExit={exitGuide}
        onReplay={replayGuide}
        onMute={() => setIsMuted((prev) => !prev)}
      />

      <button
        type="button"
        onClick={() => {
          if (!isGuideActive) startGuide();
        }}
        className={`teddy-character ${teddyMotionClass} pointer-events-auto bg-transparent p-0`}
        aria-label="Open teddy guide"
      >
        <svg viewBox="0 0 180 240" className="h-[184px] w-[148px]" aria-hidden="true">
          <ellipse cx="52" cy="198" rx="16" ry="17" fill="#e6c89d" />
          <ellipse cx="126" cy="198" rx="16" ry="17" fill="#e6c89d" />
          <ellipse cx="52" cy="201" rx="11" ry="11" fill="#d6ad7f" />
          <ellipse cx="126" cy="201" rx="11" ry="11" fill="#d6ad7f" />

          <path d="M45 119 C57 106, 121 106, 133 119 L137 174 C122 188, 58 188, 41 174 Z" fill="#241447" />
          <path d="M54 118 C63 112, 116 112, 124 118" stroke="#ab7bff" strokeWidth="3" fill="none" />
          <path d="M45 156 C56 165, 122 165, 133 156" stroke="#7c3aed" strokeWidth="2" fill="none" />

          <ellipse cx="34" cy="132" rx="12" ry="16" fill="#efd5b1" />
          <ellipse cx="144" cy="132" rx="12" ry="16" fill="#efd5b1" />
          <path d="M26 122 L40 124 L38 148 L24 146 Z" fill="#2b1955" />
          <path d="M152 122 L138 124 L140 148 L154 146 Z" fill="#2b1955" />

          <circle cx="60" cy="62" r="19" fill="#ebcca6" />
          <circle cx="120" cy="62" r="19" fill="#ebcca6" />
          <circle cx="90" cy="87" r="46" fill="#f2d7b3" />
          <ellipse cx="90" cy="104" rx="24" ry="16" fill="#e4c39a" />

          <circle cx="76" cy="88" r="7" fill="#101014" />
          <circle cx="104" cy="88" r="7" fill="#101014" />
          <circle ref={leftEyeRef} cx="76" cy="88" r="3.2" fill="#ffffff" />
          <circle ref={rightEyeRef} cx="104" cy="88" r="3.2" fill="#ffffff" />
          <circle cx="76" cy="88" r="9.2" fill="none" stroke="#c4b5fd" strokeWidth="2.2" />
          <circle cx="104" cy="88" r="9.2" fill="none" stroke="#c4b5fd" strokeWidth="2.2" />
          <path d="M85 88 L95 88" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
          <path d="M67 86 L61 84" stroke="#c4b5fd" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M113 86 L119 84" stroke="#c4b5fd" strokeWidth="1.8" strokeLinecap="round" />

          <ellipse cx="90" cy="101" rx="7" ry="5" fill="#0f0f14" />
          <path d="M90 104 L90 112" stroke="#0f0f14" strokeWidth="2" />
          <path d="M90 112 C85 117, 80 117, 76 114" stroke="#171720" strokeWidth="1.8" fill="none" />
          <path d="M90 112 C95 117, 100 117, 104 114" stroke="#171720" strokeWidth="1.8" fill="none" />

          <path d="M4 30 L176 30 L146 49 L34 49 Z" fill="#090713" stroke="#6d28d9" strokeWidth="1.8" />
          <rect x="63" y="14" width="54" height="17" rx="2.8" fill="#140b2b" stroke="#7c3aed" strokeWidth="1.4" />
          <rect x="63" y="31" width="54" height="4.2" fill="#a855f7" />
          <line x1="146" y1="33" x2="146" y2="79" stroke="#1a1130" strokeWidth="2.8" />
          <circle cx="146" cy="79" r="5.1" fill="#1a1130" />
          <path d="M146 82 Q150 95 158 110" stroke="#c4b5fd" strokeWidth="2.5" fill="none" />
          <path d="M155 107 L162 116 L153 116 Z" fill="#c4b5fd" />
        </svg>
      </button>

      {isGuideActive ? (
        <div className="pointer-events-none mt-2 rounded-lg border border-purple-300/30 bg-[#0f0a22]/85 px-2 py-1 text-[10px] text-purple-100">
          Visited: {visitedSections.length}/{TOUR_STEPS.length}
        </div>
      ) : null}
    </div>
  );

  if (isFloating) {
    return createPortal(
      <div ref={shellRef} className="teddy-shell fixed left-0 top-0 z-[240] will-change-transform">
        {teddyContent}
      </div>,
      document.body
    );
  }

  return (
    <div ref={shellRef} className="teddy-shell relative z-[2]">
      {teddyContent}
    </div>
  );
};

export default MascotController;
