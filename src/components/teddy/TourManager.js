import { useCallback, useEffect, useMemo, useState } from "react";
import { TOUR_STEPS } from "./SectionAnchors";

const TOUR_COMPLETED_KEY = "teddy_tour_completed";
const VISITED_SECTIONS_KEY = "teddy_visited_sections";

const getStoredVisited = () => {
  try {
    const raw = localStorage.getItem(VISITED_SECTIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const useTourManager = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isGuideActive, setIsGuideActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [visitedSections, setVisitedSections] = useState(() => getStoredVisited());
  const [tourCompleted, setTourCompleted] = useState(() => localStorage.getItem(TOUR_COMPLETED_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(VISITED_SECTIONS_KEY, JSON.stringify(visitedSections));
  }, [visitedSections]);

  useEffect(() => {
    localStorage.setItem(TOUR_COMPLETED_KEY, String(tourCompleted));
  }, [tourCompleted]);

  const activeStep = useMemo(() => TOUR_STEPS[stepIndex], [stepIndex]);

  const markSectionVisited = useCallback((sectionId) => {
    setVisitedSections((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]));
  }, []);

  const startGuide = useCallback(() => {
    setIsGuideActive(true);
    setIsPaused(false);
    setStepIndex(0);
  }, []);

  const exitGuide = useCallback(() => {
    setIsGuideActive(false);
    setIsPaused(false);
  }, []);

  const replayGuide = useCallback(() => {
    setIsGuideActive(true);
    setIsPaused(false);
    setStepIndex(0);
  }, []);

  const nextStep = useCallback(() => {
    setStepIndex((prev) => {
      if (prev >= TOUR_STEPS.length - 1) {
        setTourCompleted(true);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  const previousStep = useCallback(() => {
    setStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  return {
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
    previousStep,
    totalSteps: TOUR_STEPS.length,
  };
};

export default useTourManager;
