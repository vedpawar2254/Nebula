"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";

const HomeLanding: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [contributors, setContributors] = useState<any[]>([]);
  const [featuredRepos, setFeaturedRepos] = useState<any[]>([]);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [controls, inView, hasAnimated]);

  useEffect(() => {
    fetch("https://api.github.com/repos/SASTxNST/Website_SAST")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(null));

    fetch("https://api.github.com/repos/SASTxNST/Website_SAST/contributors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContributors(data);
        } else {
          console.warn("Contributors response not array:", data);
          setContributors([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching contributors:", err);
        setContributors([]);
      });

    Promise.all([
      fetch("https://api.github.com/repos/SASTxNST/Website_SAST").then((res) =>
        res.json()
      ),
      fetch("https://api.github.com/repos/SASTxNST/Nebula").then((res) =>
        res.json()
      ),
      fetch(
        "https://api.github.com/repos/SASTxNST/Sensor-Data-Visualiser"
      ).then((res) => res.json()),
    ])
      .then((data) => {
        if (Array.isArray(data)) {
          setFeaturedRepos(data);
        } else {
          console.warn("Unexpected repo response:", data);
          setFeaturedRepos([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching featured repos:", err);
        setFeaturedRepos([]);
      });
  }, []);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="mt-10" style={{ position: "relative", overflow: "hidden" }}>
      <section
        id="home"
        ref={ref}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "4rem 1rem",
          textAlign: "center",
          color: "white",
        }}
      >
        {/* {stars !== null && (
          <p style={{ color: "#88ccff", fontSize: "1.1rem", marginBottom: "1rem" }}>
            ⭐ {stars}+ Stars on GitHub – Join the mission!
          </p>
        )} */}

        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          style={{
            fontSize: "3.2rem",
            fontWeight: "900",
            marginBottom: "1.5rem",
            letterSpacing: "0.05em",
            background: "linear-gradient(90deg, #00aaff, #66ccff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            minHeight: "4rem",
          }}
        >
          <Typewriter
            words={[
              "Launch Into Open Source",
              "Build together with SAST",
              "Contribute. Collaborate. Create.",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </motion.h1>

        {isDesktop && (
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "3rem",
              padding: "0 1rem",
            }}
          >
            {["Fix Bugs", "Improve UI", "Write Docs", "Add Features"].map(
              (task) => (
                <div
                  key={task}
                  style={{
                    width: "200px",
                    padding: "1.2rem",
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color: "#00a1ff",
                    }}
                  >
                    {task}
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Explore GitHub issues for this task
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </section>

      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          color: "#00aaff",
        }}
      >
        Some of our Contributors
      </h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          padding: "2rem 1rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {Array.isArray(contributors) &&
          contributors.slice(0, 12).map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={contributor.login}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "0.8rem",
                borderRadius: "12px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                style={{ width: 48, height: 48, borderRadius: "50%" }}
              />
            </a>
          ))}
      </div>

      {featuredRepos.length > 0 && (
        <div
          style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              color: "#00aaff",
            }}
          >
            🚀 Featured Repositories
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {featuredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "1rem",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <div style={{ fontWeight: "600", color: "#66ccff" }}>
                  {repo.name}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#ccc",
                    marginBottom: "0.5rem",
                  }}
                >
                  {repo.description}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#999" }}>
                  ⭐ {repo.stargazers_count} &nbsp; | &nbsp; 🍴{" "}
                  {repo.forks_count}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLanding;
