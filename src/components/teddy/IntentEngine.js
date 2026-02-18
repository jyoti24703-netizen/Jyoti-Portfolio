import { useEffect, useRef } from "react";
import { detectSectionFromTarget, MAJOR_SECTIONS } from "./SectionAnchors";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const useIntentEngine = ({ onIntent, onSectionHover, isGuideActive }) => {
  const idleTimerRef = useRef(null);
  const hoverTimersRef = useRef({});
  const hoverHitsRef = useRef({});
  const shakeRef = useRef({ x: 0, y: 0, t: 0, score: 0 });
  const scrollRef = useRef({ y: 0, changes: [], timestamps: [] });

  useEffect(() => {
    if (isGuideActive) return undefined;

    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        onIntent?.("idle", { confidence: 0.82 });
      }, 2500);
    };

    const onMouseMove = (event) => {
      resetIdle();

      const sectionId = detectSectionFromTarget(event.target);
      if (sectionId) {
        if (hoverTimersRef.current[sectionId]) clearTimeout(hoverTimersRef.current[sectionId]);
        hoverTimersRef.current[sectionId] = setTimeout(() => {
          const count = (hoverHitsRef.current[sectionId] || 0) + 1;
          hoverHitsRef.current[sectionId] = count;
          onSectionHover?.(sectionId, count);

          if (count >= 3) {
            onIntent?.("hover_repeat", { sectionId, confidence: 0.86 });
          }
        }, 700);
      }

      const now = performance.now();
      const dt = Math.max(16, now - shakeRef.current.t);
      const distance = Math.abs(event.clientX - shakeRef.current.x) + Math.abs(event.clientY - shakeRef.current.y);
      const speed = distance / dt;
      const nextScore = clamp(shakeRef.current.score + (speed > 1.9 ? 1.4 : -0.8), 0, 8);

      if (nextScore > 6) {
        onIntent?.("cursor_shake", { confidence: 0.8 });
        shakeRef.current.score = 2;
      } else {
        shakeRef.current.score = nextScore;
      }

      shakeRef.current = {
        ...shakeRef.current,
        x: event.clientX,
        y: event.clientY,
        t: now,
      };
    };

    const onMouseOver = (event) => {
      const sectionId = detectSectionFromTarget(event.target);
      if (!sectionId) return;

      MAJOR_SECTIONS.forEach((id) => {
        if (id !== sectionId && hoverTimersRef.current[id]) {
          clearTimeout(hoverTimersRef.current[id]);
          hoverTimersRef.current[id] = null;
        }
      });
    };

    const onScroll = () => {
      resetIdle();
      const now = performance.now();
      const y = window.scrollY;
      const delta = y - scrollRef.current.y;
      scrollRef.current.y = y;

      if (Math.abs(delta) < 4) return;

      const direction = Math.sign(delta);
      scrollRef.current.changes.push(direction);
      scrollRef.current.timestamps.push(now);

      if (scrollRef.current.changes.length > 8) {
        scrollRef.current.changes.shift();
        scrollRef.current.timestamps.shift();
      }

      const recentWindow = now - 1600;
      const recentChanges = scrollRef.current.timestamps.filter((time) => time > recentWindow).length;
      const flipCount = scrollRef.current.changes.reduce((sum, value, index, arr) => {
        if (index === 0) return sum;
        return sum + (value !== arr[index - 1] ? 1 : 0);
      }, 0);

      if (recentChanges >= 5 && flipCount >= 4) {
        onIntent?.("scroll_hesitation", { confidence: 0.79 });
        scrollRef.current.changes = [];
        scrollRef.current.timestamps = [];
      }
    };

    resetIdle();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver, true);
      window.removeEventListener("scroll", onScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      Object.values(hoverTimersRef.current).forEach((timer) => timer && clearTimeout(timer));
    };
  }, [isGuideActive, onIntent, onSectionHover]);
};

export default useIntentEngine;
