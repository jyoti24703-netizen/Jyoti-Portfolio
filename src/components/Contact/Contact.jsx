import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l3dt1j8",       // YOUR EmailJS service ID
        "template_1ignrdr",      // YOUR template ID
        form.current,
        "yeqNAg00DaPbY04Ew"      // YOUR public API key
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
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
          I’m Jyoti Yadav, a Full Stack Developer from Lucknow, Uttar Pradesh.
          Feel free to reach out for opportunities, collaborations, or any questions!
        </p>
      </div>

      <div className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white text-center">
          Connect With Me 🚀
        </h3>

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
        </form>

        {/* EXTRA CONTACT INFO */}
        <div className="mt-6 text-center text-gray-300 space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:jyoti24703@gmail.com" className="text-purple-400 hover:underline">
              jyoti24703@gmail.com
            </a>
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            <a href="tel:+919548811708" className="text-purple-400 hover:underline">
              +91 95488 11708
            </a>
          </p>

          <p><strong>Location:</strong> Lucknow, Uttar Pradesh</p>

          <p>
            <a
              href="https://drive.google.com/uc?export=view&id=1Q12DngUpJ7loq34K02LxoFcIM2rKrkYu"
              className="text-purple-400 hover:underline mr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>

            <a
              href="https://www.linkedin.com/in/jyoti-yadav-043b56320/"
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/jyoti24703-netizen"
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://leetcode.com/u/carpeceaser/"
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



