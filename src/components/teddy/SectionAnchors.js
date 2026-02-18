export const MAJOR_SECTIONS = ["about", "skills", "projects", "experience", "contact"];

export const SECTION_TEXT = {
  about: "Short story of who I am.",
  skills: "These are the tools I trust.",
  projects: "Things I've built and solved.",
  experience: "Where I applied them in reality.",
  contact: "This is how humans reach me.",
};

export const TOUR_STEPS = [
  {
    id: "about",
    title: "About",
    lines: [
      "This section gives my profile overview and core strengths.",
      "Read this first to understand what I build and the roles I am targeting.",
    ],
  },
  {
    id: "skills",
    title: "Skills",
    lines: [
      "These are the tools I use in real projects.",
      "You can quickly verify frontend, backend, database, and deployment stack fit here.",
    ],
  },
  {
    id: "projects",
    title: "Projects",
    lines: [
      "This section shows live projects with practical engineering work.",
      "Open Live Demo first, then View Code to review architecture and implementation quality.",
    ],
  },
  {
    id: "experience",
    title: "Experience",
    lines: [
      "Here you can see internship and delivery exposure.",
      "Check responsibilities, tools used, and outcomes to understand real-world execution.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    lines: [
      "This is the direct communication section.",
      "Use email or social links here for interviews, collaboration, and opportunities.",
    ],
  },
];

export const getSectionElement = (id) => document.getElementById(id);

export const detectSectionFromTarget = (target) => {
  const element = target?.closest?.("section[id]");
  if (!element) return "";
  const id = element.id;
  return MAJOR_SECTIONS.includes(id) ? id : "";
};

export const getAnchorPosition = (sectionId, mascotSize = { width: 180, height: 230 }) => {
  const element = getSectionElement(sectionId);
  if (!element) {
    return {
      x: Math.max(20, window.innerWidth - mascotSize.width - 22),
      y: Math.max(20, window.innerHeight - mascotSize.height - 18),
    };
  }

  const rect = element.getBoundingClientRect();
  const margin = 12;

  let x = rect.right - mascotSize.width * 0.55;
  if (x + mascotSize.width > window.innerWidth - margin) {
    x = rect.left - mascotSize.width * 0.45;
  }

  let y = rect.top + rect.height * 0.35;
  if (y + mascotSize.height > window.innerHeight - margin) {
    y = window.innerHeight - mascotSize.height - margin;
  }

  return {
    x: Math.max(margin, x),
    y: Math.max(margin, y),
  };
};

export const getDefaultDockPosition = (mascotSize = { width: 180, height: 230 }) => ({
  x: Math.max(18, window.innerWidth - mascotSize.width - 20),
  y: Math.max(18, window.innerHeight - mascotSize.height - 16),
});
