"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });

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
      setStatus("✅ Sent successfully!");
      setIdea("");
      setEmail("");
    } else {
      setStatus("❌ Failed to send. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar setActiveSection={function (section: "home" | "ranks" | "contact" | "faq" | "profile"): void {
        throw new Error("Function not implemented.");
      } } />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex flex-col gap-5"
        >
          <h2 className="text-2xl font-bold text-cyan-400 text-center font-orbitron">
            💡 Submit Your Idea
          </h2>

          <textarea
            placeholder="What's your idea?"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
            rows={5}
            className="p-4 rounded-lg bg-black/60 border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-4 rounded-lg bg-black/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            className="py-3 bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold rounded-lg"
          >
            🚀 Submit Idea
          </button>

          {status && (
            <p className="text-center text-sm text-white/80 animate-pulse">
              {status}
            </p>
          )}
        </form>
      </main>
    </div>
  );
};

export default IdeaForm;
