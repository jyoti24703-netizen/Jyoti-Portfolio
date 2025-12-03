// src/components/Work/Work.jsx
import React, { useState } from "react";
import { projects } from "../../constants";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="work"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto mt-2"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A showcase of the projects I have worked on, highlighting my skills and
          experience in various technologies.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300"
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
              <p className="text-gray-500 mb-4 line-clamp-3">
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
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-[90%] overflow-hidden">
            <div className="flex justify-end p-4">
              <button
                className="text-white text-3xl font-bold hover:text-purple-500"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
              >
                ×
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

                <div className="flex gap-4">
                  {/* View Code: enabled only when github URL exists */}
                  {selectedProject.github ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 bg-gray-800 text-center text-gray-300 py-3 rounded-xl hover:bg-purple-700 transition"
                    >
                      View Code
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-1/2 bg-gray-700 text-gray-500 py-3 rounded-xl cursor-not-allowed"
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
                      className="w-1/2 bg-purple-600 text-center text-white py-3 rounded-xl hover:bg-purple-800 transition"
                    >
                      View Live
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-1/2 bg-gray-700 text-gray-500 py-3 rounded-xl cursor-not-allowed"
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

