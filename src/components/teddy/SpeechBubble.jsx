import React, { useEffect, useMemo, useRef, useState } from "react";

const SpeechBubble = ({
  message,
  mode,
  isGuideActive,
  isPaused,
  isMuted,
  onStart,
  onNext,
  onPause,
  onExit,
  onReplay,
  onMute,
  sectionTitle,
}) => {
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  const status = useMemo(() => {
    if (isGuideActive) return isPaused ? "Guide paused" : "Guide running";
    if (mode === "assist") return "Assist mode";
    return "Passive mode";
  }, [isGuideActive, isPaused, mode]);

  const stopTyping = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTyping(false);
  };

  useEffect(() => {
    stopTyping();
    setTyped("");
    indexRef.current = 0;
    setIsTyping(true);

    timerRef.current = setInterval(() => {
      indexRef.current += 1;
      const next = message.slice(0, indexRef.current);
      setTyped(next);

      if (indexRef.current >= message.length) {
        stopTyping();
      }
    }, 14);

    return () => stopTyping();
  }, [message]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (isTyping) {
          stopTyping();
          setTyped(message);
        } else if (isGuideActive) {
          onNext();
        }
      }

      if (event.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isGuideActive, isTyping, message, onExit, onNext]);

  return (
    <div
      className="teddy-bubble pointer-events-auto mb-2 w-[220px] rounded-2xl border border-purple-300/40 bg-[#130e2a]/95 p-3 text-xs text-gray-100 text-left"
      onClick={() => {
        if (isTyping) {
          stopTyping();
          setTyped(message);
          return;
        }

        if (isGuideActive) onNext();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" && isGuideActive) onNext();
      }}
      aria-label="Teddy speech bubble"
    >
      <p className="font-semibold text-purple-200">
        {isGuideActive && sectionTitle ? `Guiding: ${sectionTitle}` : "Graduation Teddy"}
      </p>
      <p className="mt-1 min-h-[50px] leading-5 text-gray-100">{typed || " "}</p>
      <p className="mt-2 text-[10px] uppercase tracking-wide text-purple-300/90">{status}</p>
      <p className="text-[10px] text-purple-200/80">{isMuted ? "Voice off" : "Voice on"}</p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {!isGuideActive ? (
          <button type="button" className="teddy-btn-primary" onClick={onStart}>
            Start Tour
          </button>
        ) : (
          <>
            <button type="button" className="teddy-btn" onClick={onNext}>
              Next
            </button>
            <button type="button" className="teddy-btn" onClick={onPause}>
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button type="button" className="teddy-btn" onClick={onReplay}>
              Replay
            </button>
            <button type="button" className="teddy-btn-warn" onClick={onExit}>
              Exit
            </button>
          </>
        )}

        <button type="button" className="teddy-btn" onClick={onMute}>
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export default SpeechBubble;
