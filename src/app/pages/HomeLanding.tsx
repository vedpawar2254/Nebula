"use client";

import React from "react";

const HomeLanding: React.FC = () => {
  return (
    <section
      id="home"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "4rem 2rem",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "900",
          marginBottom: "1.5rem",
          letterSpacing: "0.1em",
          background: "linear-gradient(90deg, #00aaff, #66ccff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Launch Into Open Source
      </h1>

      <p style={{ fontSize: "1.4rem", maxWidth: "800px", color: "#cccccc", marginBottom: "2.5rem" }}>
        Join our mission to build something amazing. Contribute to real-world space tech projects on GitHub with the SAST community.
      </p>

      <a
        href="https://github.com/SASTxNST/Website_SAST"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "0.8rem 2rem",
          borderRadius: "9999px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          background: "linear-gradient(to right, #00a1ff, #0050b3)",
          color: "#fff",
          textDecoration: "none",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        🌟 Contribute on GitHub
      </a>
    </section>
  );
};

export default HomeLanding;
