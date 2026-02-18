import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profileData } from "../../constants";
import { trackEvent } from "../../utils/analytics";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_l3dt1j8", "template_1ignrdr", form.current, "yeqNAg00DaPbY04Ew").then(
      () => {
        setIsSent(true);
        form.current.reset();
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      },
      (error) => {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    );
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]"
    >
      <ToastContainer />

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold text-center">
          I am {profileData.fullName}, a {profileData.headline} from {profileData.location}. Feel free
          to reach out for opportunities, collaborations, or any questions.
        </p>
      </div>

      <div className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white text-center">Connect With Me</h3>

        <form ref={form} onSubmit={sendEmail} className="mt-4 flex flex-col space-y-4">
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />

          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Send
          </button>

          {isSent && <p className="text-sm text-green-400 text-center">Thanks, message sent.</p>}
        </form>

        <div className="mt-6 text-center text-gray-300 space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${profileData.email}`} className="text-purple-400 hover:underline">
              {profileData.email}
            </a>
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            <a href={`tel:${profileData.phone.replace(/\s+/g, "")}`} className="text-purple-400 hover:underline">
              {profileData.phone}
            </a>
          </p>

          <p>
            <strong>Location:</strong> {profileData.location}
          </p>

          <p className="space-x-2">
            <a
              href={profileData.resume.downloadUrl}
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("resume_download", { source: "contact_resume_link" })}
            >
              Resume
            </a>

            <span>|</span>

            <a
              href={profileData.socials.linkedin}
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <span>|</span>

            <a
              href={profileData.socials.github}
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <span>|</span>

            <a
              href={profileData.socials.leetcode}
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
