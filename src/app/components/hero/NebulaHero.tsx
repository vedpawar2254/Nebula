import React, { useRef, useEffect } from "react";
import "./NebulaHero.css";

const NebulaHero: React.FC = () => {
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);
  const dot4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateDot = (dot: HTMLDivElement | null, radius: number, duration: number) => {
      if (!dot) return;
      let start = performance.now();

      const animate = (time: number) => {
        let elapsed = time - start;
        let angle = (elapsed / duration) * 2 * Math.PI;
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        dot.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    animateDot(dot1Ref.current, 100, 4000);
    animateDot(dot2Ref.current, 100, 6000);
    animateDot(dot3Ref.current, 150, 5000);
    animateDot(dot4Ref.current, 150, 7000);
  }, []);

  return (
    <div className="hero-container">
      <div className="orbit-container">
        <div className="elliptical-orbit orbit-ring-1" />
        <div className="elliptical-orbit orbit-ring-2" />
        <div ref={dot1Ref} className="orbit-dot ring1" />
        <div ref={dot2Ref} className="orbit-dot ring1" />
        <div ref={dot3Ref} className="orbit-dot ring2" />
        <div ref={dot4Ref} className="orbit-dot ring2" />
      </div>

      {/* LIVE Button */}
      <div className="live-button-wrapper">
        <button className="live-button">
          <span className="green-dot" />
          <span className="live-text">Live</span>
          <span className="live-date">02/06/2025</span>
        </button>
      </div>

      <h1 className="nebula-text">
        <span className="nebula-highlight"></span>NEBULA
      </h1>
    </div>
  );
};

export default NebulaHero;
