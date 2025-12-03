import React from "react";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import profileImage from "../../assets/profile2.png";

const About = () => {
  return (
    <section
      id="about"
      className="py-12 md:py-20 px-6 md:px-[7vw] lg:px-[20vw] font-sans mt-12 md:mt-20 lg:mt-28"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* LEFT: Text column */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1">
            Hi, I am
          </h1>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 leading-tight">
            Jyoti Yadav
          </h2>

          <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec]">
            <span className="text-white">I am a </span>
            <ReactTypingEffect
              text={[
                "Full Stack Developer",
                "MERN Stack Developer",
                "React & Tailwind Specialist",
                "Node.js & Express Backend Developer",
              ]}
              speed={80}
              eraseSpeed={45}
              typingDelay={250}
              eraseDelay={1400}
              cursorRenderer={(cursor) => <span className="text-[#8245ec]">{cursor}</span>}
            />
          </h3>

          <p className="text-base sm:text-lg md:text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
            Hi — I’m <strong>Jyoti Yadav</strong>, a Full Stack Developer based in Lucknow, Uttar
            Pradesh. I build efficient and scalable web apps with strong skills in the MERN stack,
            backend APIs, and real-time features.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://drive.google.com/file/d/1Q12DngUpJ7loq34K02LxoFcIM2rKrkYu/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white py-3 px-6 rounded-full text-lg font-semibold transition transform hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #8245ec, #a855f7)",
                boxShadow: "0 8px 30px rgba(130,69,236,0.18)",
              }}
            >
              DOWNLOAD CV
            </a>

            <a
              href="mailto:jyoti24703@gmail.com"
              className="inline-block bg-gray-800 text-gray-200 py-3 px-5 rounded-full border border-gray-700 hover:bg-gray-700 transition"
            >
              Email Me
            </a>
          </div>

          {/* Short summary below buttons */}
          <p className="text-gray-400 mt-8 max-w-xl">
            I focus on writing clean, maintainable code and shipping reliable full-stack solutions — from UI to APIs to deployment.
          </p>

          {/* Certifications & Quick Facts (kept same) */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Certifications</h4>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>
                  <strong>NPTEL – Programming, Data Structures and Algorithms</strong>
                  <div className="text-sm text-purple-400">
                    <a
                      href="https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs131/Course/NPTEL24CS131S55120099904073544.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </div>
                </li>

                <li>
                  <strong>Typing.com – Typing Speed & Accuracy Certification</strong>
                  <div className="text-sm text-purple-400">
                    <a
                      href="https://www.typing.com/apiv1/student/tests/339130469/164547525/certificate?language=en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Quick Facts</h4>
              <div className="text-gray-300 space-y-2 text-sm">
                <p><strong>Location:</strong> Lucknow, Uttar Pradesh</p>
                <p><strong>Availability:</strong> Open to internships & full-time roles</p>
                <p><strong>Contact:</strong> jyoti24703@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Profile Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-6 border-purple-600"
            tiltMaxAngleX={14}
            tiltMaxAngleY={14}
            perspective={900}
            scale={1.03}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <img
              src={profileImage}
              alt="Jyoti Yadav"
              className="w-full h-full rounded-full object-cover shadow-2xl"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
