// src/components/Work/Work.jsx
import React, { useEffect, useState } from "react";
import { projects } from "../../constants";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    if (card.__springFrame) {
      cancelAnimationFrame(card.__springFrame);
      card.__springFrame = null;
    }
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 6;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.015)`;
    card.dataset.rx = String(rotateX);
    card.dataset.ry = String(rotateY);
  };

  const handleCardPress = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX ?? rect.left + rect.width / 2;
    const y = event.clientY ?? rect.top + rect.height / 2;
    const rotateY = ((x - rect.left - rect.width / 2) / rect.width) * 4;
    const rotateX = ((rect.height / 2 - (y - rect.top)) / rect.height) * 4;

    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) scale(0.99)`;
  };

  const handleCardLeave = (event) => {
    const card = event.currentTarget;
    if (card.__springFrame) {
      cancelAnimationFrame(card.__springFrame);
      card.__springFrame = null;
    }

    let rx = Number(card.dataset.rx || 0);
    let ry = Number(card.dataset.ry || 0);
    let vx = 0;
    let vy = 0;

    const animateBack = () => {
      vx = vx * 0.72 + -rx * 0.2;
      vy = vy * 0.72 + -ry * 0.2;
      rx += vx;
      ry += vy;

      const intensity = Math.min(6, Math.abs(rx) + Math.abs(ry));
      const lift = Math.max(0, intensity * 0.35);
      const scale = 1 + Math.min(0.012, intensity * 0.0018);

      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-${lift}px) scale(${scale})`;

      const done = Math.abs(rx) + Math.abs(ry) + Math.abs(vx) + Math.abs(vy) < 0.08;
      if (done) {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.style.transform = "";
        card.dataset.rx = "0";
        card.dataset.ry = "0";
        card.__springFrame = null;
        return;
      }

      card.__springFrame = requestAnimationFrame(animateBack);
    };

    card.__springFrame = requestAnimationFrame(animateBack);
  };

  return (
    <section
      id="projects"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto mt-2"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          Selected full-stack projects focused on product quality, scalability,
          and real-world engineering impact.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedProject(project);
              }
            }}
            onPointerMove={handleCardMove}
            onPointerLeave={handleCardLeave}
            onPointerDown={handleCardPress}
            onPointerUp={handleCardMove}
            className="dynamic-card dynamic-project-card reveal-card border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl cursor-pointer transition-transform duration-300"
            role="button"
            tabIndex={0}
            aria-label={`Open details for ${project.title}`}
          >
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {project.webapp ? (
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="w-1/2 text-center bg-purple-600 text-white text-sm py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      Live Demo
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-1/2 bg-gray-700 text-gray-400 text-sm py-2 rounded-lg cursor-not-allowed"
                    >
                      Not Live
                    </button>
                  )}

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="w-1/2 text-center bg-gray-800 text-gray-200 text-sm py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                      View Code
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-1/2 bg-gray-700 text-gray-400 text-sm py-2 rounded-lg cursor-not-allowed"
                    >
                      Private Repo
                    </button>
                  )}
                </div>

                <div className="text-xs text-gray-400">
                  Click card for full project details.
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-[90%] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end p-4">
              <button
                className="text-white text-3xl font-bold hover:text-purple-500"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-[95%] rounded-xl mb-6"
              />

              <div className="px-6 pb-8 w-full">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-gray-400 mb-6">
                  {selectedProject.description}
                </p>

                {selectedProject.highlights?.length ? (
                  <ul className="mb-6 space-y-2 text-sm text-gray-300">
                    {selectedProject.highlights.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-purple-400 mt-[2px]">-</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* View Code: enabled only when github URL exists */}
                  {selectedProject.github ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-1/2 bg-gray-800 text-center text-gray-300 py-3 rounded-xl hover:bg-purple-700 transition"
                    >
                      View Code
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full sm:w-1/2 bg-gray-700 text-gray-500 py-3 rounded-xl cursor-not-allowed"
                    >
                      No Repo
                    </button>
                  )}

                  {/* Deployment / Live: show "View Live" only if webapp exists, else disabled "Not Deployed" */}
                  {selectedProject.webapp ? (
                    <a
                      href={selectedProject.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-1/2 bg-purple-600 text-center text-white py-3 rounded-xl hover:bg-purple-800 transition"
                    >
                      View Live
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full sm:w-1/2 bg-gray-700 text-gray-500 py-3 rounded-xl cursor-not-allowed"
                    >
                      Not Deployed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;

