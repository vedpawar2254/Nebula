import React, { useEffect, useRef } from "react";
import "./NebulaHero.css";

const NebulaHero: React.FC = () => {
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);
  const dot4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let progress1 = 0;
    let progress2 = Math.PI;
    let progress3 = Math.PI / 2;
    let progress4 = (3 * Math.PI) / 2;

    const animate = () => {
      progress1 += 0.01;
      progress2 += 0.01;
      progress3 += 0.01;
      progress4 += 0.01;

      const a1 = window.innerWidth * 0.3;
      const b1 = window.innerWidth * 0.1;
      const angle1 = (-40 * Math.PI) / 180;

      const a2 = a1 * 0.9; // slightly smaller second ring
      const b2 = b1 * 1.2; // slightly taller
      const angle2 = (-20 * Math.PI) / 180; // different tilt

const setDotPosition = (
  ref: React.RefObject<HTMLDivElement | null>,
  t: number,
  a: number,
  b: number,
  angle: number
) => {

        const x = a * Math.cos(t);
        const y = b * Math.sin(t);

        const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
        const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);

        if (ref.current) {
          ref.current.style.transform = `translate(calc(-50% + ${rotatedX}px), calc(-50% + ${rotatedY}px))`;
        }
      };

      setDotPosition(dot1Ref, progress1, a1, b1, angle1);
      setDotPosition(dot2Ref, progress2, a1, b1, angle1);

      setDotPosition(dot3Ref, progress3, a2, b2, angle2);
      setDotPosition(dot4Ref, progress4, a2, b2, angle2);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
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
      <h1 className="nebula-text">
        <span className="nebula-highlight"></span>NEBULA</h1>
    </div>
  );
};

export default NebulaHero;
