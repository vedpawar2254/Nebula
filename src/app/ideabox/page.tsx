"use client";

import React, { useState } from "react";

const IdeaForm = () => {
  const [idea, setIdea] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "be343a82-8d0a-4bc4-a482-63142b6f84d4",
        subject: "New Idea Submission",
        email,
        idea,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Sent! ✅");
      setIdea("");
      setEmail("");
    } else {
      setStatus("Failed to send ❌");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#f0f0f0",
        fontFamily: "Arial, sans-serif", // 👈 Added simple font
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#1e1e1e",
          border: "1px solid #333",
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center" }}>💡 Submit Your Idea</h2>

        <textarea
          placeholder="Your idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          required
          rows={5}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#222",
            color: "#fff",
            fontFamily: "inherit",
          }}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#222",
            color: "#fff",
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#00b894",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontFamily: "inherit",
          }}
        >
          🚀 Submit Idea
        </button>
        <p style={{ textAlign: "center" }}>{status}</p>
      </form>
    </div>
  );
};

export default IdeaForm;
