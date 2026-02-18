// =======================================================
//               TECH LOGO IMPORTS
// =======================================================
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import materialuiLogo from './assets/tech_logo/materialui.png';
import reduxLogo from './assets/tech_logo/redux.png';
import gsapLogo from './assets/tech_logo/gsap.png';
import javaLogo from './assets/tech_logo/java.png';
import cppLogo from './assets/tech_logo/cpp.png';
import cLogo from './assets/tech_logo/c.png';
import pythonLogo from './assets/tech_logo/python.png';
import typescriptLogo from './assets/tech_logo/typescript.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import figmaLogo from './assets/tech_logo/figma.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import springbootLogo from './assets/tech_logo/springboot.png';
import nextjsLogo from './assets/tech_logo/nextjs.png';

// =======================================================
//               EXPERIENCE LOGO IMPORTS
// =======================================================
import codecLogo from './assets/work_logo/codec_logo.png';

// =======================================================
//               EDUCATION LOGO IMPORTS (Correct Names)
// =======================================================
import amityLogo from './assets/education_logo/amity_logo.png';
import asianSchoolLogo from './assets/education_logo/asian_school_logo.png';
import banasthaliLogo from './assets/education_logo/banasthali_logo.png';

// =======================================================
//               PROJECT LOGO IMPORTS
// =======================================================
// Different images so both projects look different
import chatAppLogo from './assets/work_logo/cm.png';
import snapsyLogo from './assets/work_logo/image_search.png';
import emsLogo from './assets/work_logo/task_rem.png';

// =======================================================
//                    PROFILE DATA
// =======================================================
export const profileData = {
  firstName: 'Jyoti',
  lastName: 'Yadav',
  fullName: 'Jyoti Yadav',
  headline: 'Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'MERN Stack Developer',
    'React & Tailwind Specialist',
    'Node.js & Express Backend Developer',
  ],
  bio: "I am Jyoti Yadav, a Full Stack Developer based in Lucknow, Uttar Pradesh. I build scalable web applications with strong focus on clean UI, reliable backend APIs, and real-time experiences.",
  summary:
    'I focus on clean architecture, maintainable code, and production-ready full-stack delivery from frontend to backend.',
  location: 'Lucknow, Uttar Pradesh',
  availability: 'Open to internships and full-time roles',
  email: 'jyoti24703@gmail.com',
  phone: '+91 95488 11708',
  socials: {
    github: 'https://github.com/jyoti24703-netizen',
    linkedin: 'https://www.linkedin.com/in/jyoti-yadav-043b56320/',
    leetcode: 'https://leetcode.com/u/carpeceaser/',
  },
  resume: {
    // Update these three fields anytime you want to change your resume.
    viewUrl:
      'https://drive.google.com/file/d/1-nbcjSjNneDCB78VZo5p_dOJbibRv8YF/view?usp=sharing',
    downloadUrl:
      'https://drive.google.com/uc?export=download&id=1-nbcjSjNneDCB78VZo5p_dOJbibRv8YF',
    fileName: 'Jyoti-Yadav-Resume.pdf',
  },
  certifications: [
    {
      title: 'NPTEL - Programming, Data Structures and Algorithms',
      url: 'https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs131/Course/NPTEL24CS131S55120099904073544.pdf',
    },
    {
      title: 'Typing.com - Typing Speed & Accuracy Certification',
      url: 'https://www.typing.com/apiv1/student/tests/339130469/164547525/certificate?language=en',
    },
  ],
};

// =======================================================
//                      SKILLS
// =======================================================
export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
      { name: 'Material UI', logo: materialuiLogo },
      { name: 'JavaScript (ES6+)', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Next.js', logo: nextjsLogo },
    ],
  },

  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', logo: nodejsLogo },
      { name: 'Express.js', logo: expressjsLogo },
      { name: 'Spring Boot', logo: springbootLogo },
    ],
  },

  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'PHP', logo: javascriptLogo }, 
      { name: 'Java', logo: javaLogo },
      { name: 'C', logo: cLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'TypeScript', logo: typescriptLogo },
    ],
  },

  {
    title: 'Libraries & State',
    skills: [
      { name: 'Express.js', logo: expressjsLogo },
      { name: 'Socket.io', logo: javascriptLogo },
      { name: 'TailwindCSS', logo: tailwindcssLogo },
      { name: 'DaisyUI', logo: tailwindcssLogo },
      { name: 'Zustand', logo: reactjsLogo },
      { name: 'JWT', logo: githubLogo },
      { name: 'Redux', logo: reduxLogo },
      { name: 'GSAP', logo: gsapLogo },
    ],
  },

  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },

  {
    title: 'Dev Tools & Platforms',
    skills: [
      { name: 'npm', logo: nodejsLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'Postman', logo: postmanLogo },
      { name: 'Netlify', logo: netlifyLogo },
      { name: 'Vercel', logo: vercelLogo },
      { name: 'Figma', logo: figmaLogo },
    ],
  },
];

// =======================================================
//                      EXPERIENCE
// =======================================================
export const experiences = [
  {
    id: 0,
    img: codecLogo,
    role: "Cloud Computing Intern",
    company: "Codec Technologies",
    date: "May 2025 - July 2025",
    desc:
      "Worked as a Cloud Computing Intern building cloud image-processing pipelines and backend services using Node.js and Express.",
    skills: [
      "Node.js",
      "Express.js",
      "Cloud image processing",
      "APIs",
      "Deployment basics"
    ],
  },
];

// =======================================================
//                      EDUCATION
// =======================================================
export const education = [
  {
    id: 0,
    img: amityLogo,
    school: "Amity University, Lucknow",
    date: "2022 - 2026",
    grade: "B.Tech CSE",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    desc: "Studying software engineering, algorithms, databases, and full-stack web development.",
  },
  {
    id: 1,
    img: asianSchoolLogo,
    school: "The Asian School, Shikohabad (CBSE)",
    date: "2020 - 2021",
    grade: "85%",
    degree: "Senior Secondary (Class XII)",
    desc: "PCM with Computer Science.",
    marksheet: "https://drive.google.com/file/d/1rBi0ciC6iwiSlLkAwXSKecaStkteL8Vy/view"
  },
  {
    id: 2,
    img: banasthaliLogo,
    school: "Banasthali Vidyapith, Rajasthan",
    date: "2018 - 2019",
    grade: "91.87%",
    degree: "High School (Class X)",
    desc: "Science with Computer Applications.",
  },
];

// =======================================================
//                      PROJECTS
// =======================================================
export const projects = [
  {
    id: 0,
    title: "Real-Time Chat Application (MERN Stack)",
    description:
      "A full-stack chat system with real-time messaging using Socket.io, JWT authentication, Zustand global state, and online presence tracking.",
    image: chatAppLogo,
    tags: ["MERN", "Socket.io", "TailwindCSS", "JWT", "Zustand"],
    github: "https://github.com/jyoti24703-netizen/real-time-chat-app",
    webapp: "",
  },

  {
    id: 1,
    title: "Snapsy - Visual Inspiration Board",
    description:
      "Full-stack content board platform with secure authentication, cloud media handling, and responsive multi-device UX.",
    highlights: [
      "Developed a full-stack platform using React.js, Node.js, Express.js, and MongoDB.",
      "Implemented JWT-based authentication and secure user sessions.",
      "Integrated cloud-backed image storage and media handling.",
      "Designed a fully responsive, multi-device user interface.",
      "Built and consumed RESTful APIs for board and content management.",
    ],
    image: snapsyLogo,
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/jyoti24703-netizen/snapsy-project.git",
    webapp: "https://snapsy-final-1.onrender.com/",
  },

  {
    id: 2,
    title: "Enterprise Employee Management System (EMS Console)",
    description:
      "Built a full-stack Employee Management System with React, Vite, Tailwind, Node.js, Express, MongoDB, and JWT with capability-based RBAC for admin and employee access. Engineered enterprise task workflows (assigned, accepted, in-progress, completed, verified, failed, reopened) with modification and extension approvals, SLA timeout automation, file uploads, and complete activity timeline and audit tracking. Implemented meeting management (RSVP, templates, notifications), community notices, and analytics dashboards for performance and failure insights.",
    image: emsLogo,
    tags: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "JWT", "RBAC"],
    github: "https://github.com/jyoti24703-netizen/ems-console",
    webapp: "https://ems-console-iota.vercel.app/",
  },
];
