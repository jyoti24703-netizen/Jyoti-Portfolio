import React from "react";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import { profileData } from "../../constants";
import { trackEvent } from "../../utils/analytics";

const About = () => {
  const handleResumeDownload = () => {
    trackEvent("resume_download", { source: "about_primary_button" });
  };

  return (
    <section
      id="about"
      className="py-12 md:py-20 px-6 md:px-[7vw] lg:px-[20vw] font-sans mt-12 md:mt-20 lg:mt-28"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1">Hi, I am</h1>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 leading-tight">
            {profileData.fullName}
          </h2>

          <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec]">
            <span className="text-white">I am a </span>
            <ReactTypingEffect
              text={profileData.roles}
              speed={80}
              eraseSpeed={45}
              typingDelay={250}
              eraseDelay={1400}
              cursorRenderer={(cursor) => <span className="text-[#8245ec]">{cursor}</span>}
            />
          </h3>

          <p className="text-base sm:text-lg md:text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
            {profileData.bio}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href={profileData.resume.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeDownload}
              className="inline-block text-white py-3 px-6 rounded-full text-lg font-semibold transition transform hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #8245ec, #a855f7)",
                boxShadow: "0 8px 30px rgba(130,69,236,0.18)",
              }}
            >
              Download Resume
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="inline-block bg-gray-800 text-gray-200 py-3 px-5 rounded-full border border-gray-700 hover:bg-gray-700 transition"
            >
              Email Me
            </a>
          </div>

          <p className="text-gray-400 mt-8 max-w-xl">{profileData.summary}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {[
              "Clean, scalable architecture",
              "Responsive production-ready UI",
              "API-first full-stack delivery",
            ].map((item) => (
              <div
                key={item}
                className="dynamic-card border border-purple-400/30 bg-[#110d24] text-purple-100 text-sm px-3 py-3 rounded-xl"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Certifications</h4>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                {profileData.certifications.map((certificate) => (
                  <li key={certificate.title}>
                    <strong>{certificate.title}</strong>
                    <div className="text-sm text-purple-400">
                      <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                        View Certificate
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Quick Facts</h4>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>
                  <strong>Location:</strong> {profileData.location}
                </p>
                <p>
                  <strong>Availability:</strong> {profileData.availability}
                </p>
                <p>
                  <strong>Contact:</strong> {profileData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="dynamic-card w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-4 border-purple-600"
            tiltMaxAngleX={14}
            tiltMaxAngleY={14}
            perspective={900}
            scale={1.03}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <img
              src="/profile-enterprise.png"
              alt={profileData.fullName}
              className="w-full h-full rounded-full object-cover shadow-2xl"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
