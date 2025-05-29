"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaWhatsapp, FaInstagram} from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus({
        success: true,
        message: "Your message has been sent! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "white",
    fontSize: "1rem",
    marginBottom: "1rem",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  // Social link common styles
  const socialLinkStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    textDecoration: "none",
    color: "white",
    width: "200px",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  };

  // Handlers for hover effects on social links
  const onMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(-10px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 170, 255, 0.3)";
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <section
        id="contact"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "4rem 1rem",
          color: "white",
        }}
      >
        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "3.2rem",
            fontWeight: "900",
            marginBottom: "2.5rem",
            letterSpacing: "0.05em",
            background: "linear-gradient(90deg, #00aaff, #66ccff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            color: "#cccccc",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          Have questions about Project Nebula or want to join SAST? Reach out to
          us through any of these channels or use the form below.
        </motion.p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "1000px",
            gap: "4rem",
          }}
        >
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              margin: "0 auto",
            }}
          >
            <a
              href="mailto:contact@sast.org"
              style={socialLinkStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <FaEnvelope
                size={40}
                color="#00aaff"
                style={{ marginBottom: "1rem" }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </span>
              <span
                style={{ fontSize: "0.9rem", color: "#aaa", textAlign: "center" }}
              >
                contact@sast.org
              </span>
            </a>

            <a
              href="https://github.com/SASTxNST"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <FaGithub
                size={40}
                color="#00aaff"
                style={{ marginBottom: "1rem" }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                GitHub
              </span>
              <span
                style={{ fontSize: "0.9rem", color: "#aaa", textAlign: "center" }}
              >
                SASTxNST
              </span>
            </a>

            <a
              href="https://chat.whatsapp.com/CxIYJykKovVB1jfHnxuIuR"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <FaWhatsapp
                size={40}
                color="#00aaff"
                style={{ marginBottom: "1rem" }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                WhatsApp
              </span>
              <span
                style={{ fontSize: "0.9rem", color: "#aaa", textAlign: "center" }}
              >
                Join our community
              </span>
            </a>

            <a
              href="https://www.instagram.com/sast.rishihood/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <FaInstagram
                size={40}
                color="#00aaff"
                style={{ marginBottom: "1rem" }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                Instagram
              </span>
              <span
                style={{ fontSize: "0.9rem", color: "#aaa", textAlign: "center" }}
              >
                @sast.rishihood
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            style={{
              width: "100%",
              maxWidth: "700px",
              margin: "0 auto",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "16px",
              padding: "2.5rem 2rem",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
                style={inputStyle}
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  minHeight: "140px",
                  resize: "vertical",
                }}
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background:
                    "linear-gradient(90deg, #00aaff, #66ccff)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "0.8rem 1.5rem",
                  color: "white",
                  fontWeight: "700",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontSize: "1.1rem",
                  width: "100%",
                  marginTop: "1rem",
                  boxShadow: "0 4px 15px rgba(0,170,255,0.4)",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "linear-gradient(90deg, #0099dd, #55bbff)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "linear-gradient(90deg, #00aaff, #66ccff)";
                  }
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {submitStatus && (
              <p
                style={{
                  marginTop: "1rem",
                  color: submitStatus.success ? "#66ff66" : "#ff6666",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {submitStatus.message}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Background circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          position: "absolute",
          top: "-10rem",
          left: "-10rem",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #00aaff 0%, transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 2, delay: 2 }}
        style={{
          position: "absolute",
          bottom: "-15rem",
          right: "-15rem",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #66ccff 0%, transparent 80%)",
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Contact;
