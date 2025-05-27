"use client";

import React, { useEffect, useRef, useState } from "react";

interface SidebarProps {
  setActiveSection: (section: "home" | "ranks") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sidebarRef.current) observer.observe(sidebarRef.current);
    return () => {
      if (sidebarRef.current) observer.unobserve(sidebarRef.current);
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    padding: "0.75rem 1rem",
    borderRadius: "9999px",
    fontWeight: "bold",
    background: "rgba(255, 255, 255, 0.03)",
    color: "#cccccc",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    backdropFilter: "blur(10px)",
    marginBottom: "1rem",
    width: "100%",
    textAlign: "left",
  };

  const handleHover = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    hover = true
  ) => {
    e.currentTarget.style.background = hover
      ? "rgba(255, 255, 255, 0.07)"
      : "rgba(255, 255, 255, 0.03)";
  };

  return (
    <div
      ref={sidebarRef}
      style={{
        width: "20rem",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "var(--color-text)",
        minHeight: "100vh",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        transform: isVisible ? "translateX(0)" : "translateX(-50px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.8s ease-out",
      }}
    >
      <button
        onClick={() => setActiveSection("home")}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        🏠 Home
      </button>

      <button
        onClick={() => setActiveSection("ranks")}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        🏆 Leaderboard
      </button>
    </div>
  );
};

export default Sidebar;
