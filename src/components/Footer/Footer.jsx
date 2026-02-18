import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profileData } from "../../constants";
import GraduationTeddy from "../GraduationTeddy";
import OwnerInsights from "../OwnerInsights";
import { trackEvent } from "../../utils/analytics";

const Footer = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="text-white py-10 px-[12vw] md:px-[7vw] lg:px-[20vw] border-t border-white/10 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div>
            <h2 className="text-xl font-semibold text-purple-400">{profileData.fullName}</h2>
            <p className="text-gray-400 mt-3 text-sm leading-6">
              {profileData.headline} building clean, scalable, and production-ready web products.
            </p>
            <OwnerInsights />
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-300 mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {[
                { name: "About", id: "about" },
                { name: "Skills", id: "skills" },
                { name: "Experience", id: "experience" },
                { name: "Projects", id: "projects" },
                { name: "Education", id: "education" },
                { name: "Contact", id: "contact" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleScroll(item.id)}
                  className="text-left text-sm text-gray-400 hover:text-purple-400 transition"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-300 mb-3">Connect</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <p>{profileData.email}</p>
              <p>{profileData.phone}</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/30 transition"
                aria-label="GitHub profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/30 transition"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={profileData.resume.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("resume_download", { source: "footer_resume_link" })}
                className="text-sm px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <GraduationTeddy />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-8 pt-5 border-t border-white/10">
          (c) {new Date().getFullYear()} {profileData.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
