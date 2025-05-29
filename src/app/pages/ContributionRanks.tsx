"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import LeaderboardContest from "./LeaderboardContest";
import Contact from "./Contact";
import FAQ from "./FAQ";

const fontStyle = {
  fontFamily: "'Inter', sans-serif",
};

const repos = [
  { owner: "SASTxNST", name: "Website_SAST" },
  { owner: "SASTxNST", name: "Nebula" },
  { owner: "SASTxNST", name: "Sensor Data Visualiser" },
];

const ContributionRanks = () => {
  const [selectedRepo, setSelectedRepo] = useState(repos[0]);
  const [activeSection, setActiveSection] = useState<
    "home" | "ranks" | "contact" | "faq"
  >("home");
  const [snapshot, setSnapshot] = useState({
    contributors: 0,
    commits: 0,
    repositories: repos.length,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedRepo]);

  useEffect(() => {
    if (!searchParams) return;
    const section = searchParams.get("section");
    if (section === "contact" || section === "faq") {
      setActiveSection(section);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const [contributorsRes, commitsRes] = await Promise.all([
          fetch(
            `https://api.github.com/repos/${selectedRepo.owner}/${selectedRepo.name}/contributors`
          ),
          fetch(
            `https://api.github.com/repos/${selectedRepo.owner}/${selectedRepo.name}/commits`
          ),
        ]);
        const contributors = await contributorsRes.json();
        const commits = await commitsRes.json();
        setSnapshot({
          contributors: Array.isArray(contributors) ? contributors.length : 0,
          commits: Array.isArray(commits) ? commits.length : 0,
          repositories: repos.length,
        });
      } catch (error) {
        console.error("Error fetching snapshot data:", error);
      }
    };
    fetchSnapshot();
  }, [selectedRepo]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)),
          url("https://i.postimg.cc/BnBLwG3h/2816786.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff",
        ...fontStyle,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          position: "relative",
          display: "flex",
        }}
      >
        <Sidebar
          setActiveSection={setActiveSection}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((open) => !open)}
        />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
            position: "relative",
            zIndex: 1,
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "100vh", // Prevent overflow beyond viewport
          }}
        >
          {activeSection === "ranks" && <LeaderboardContest />}
          {activeSection === "contact" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                maxHeight: "100vh",
              }}
              className="custom-scrollbar"
            >
              <Contact />
            </div>
          )}
          {activeSection === "faq" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                maxHeight: "100vh",
              }}
              className="custom-scrollbar"
            >
              <FAQ />
            </div>
          )}

          {activeSection === "home" && (
            <>
              <div
                style={{
                  fontSize: "14rem",
                  fontWeight: "900",
                  opacity: 0.05,
                  position: "absolute",
                  top: "4%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 0,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                SAST
              </div>

              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  zIndex: 1,
                }}
              >
                <span style={{ color: "#4fc3f7" }}>...better</span> than missing
                out on innovation.
              </div>

              <div
                style={{
                  fontSize: "1.25rem",
                  marginTop: "1rem",
                  zIndex: 1,
                  maxWidth: "700px",
                }}
              >
                Join our open-source journey — collaborate, learn, and grow with
                a passionate community.
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "2rem",
                  zIndex: 1,
                }}
              >
                {[
                  "Build Together",
                  "Build Real Projects",
                  "Improve Your GitHub",
                  "Grow Your Network",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    <span style={{ color: "#00e676", fontWeight: "bold" }}>
                      ✔
                    </span>{" "}
                    {item}
                  </div>
                ))}
              </div>

              <button
                style={{
                  marginTop: "3rem",
                  padding: "1rem 2.5rem",
                  fontSize: "1.1rem",
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #0d47a1, #1976d2, #4fc3f7)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition:
                    "box-shadow 0.3s ease-in-out, background 0.3s ease-in-out",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 18px rgba(79, 195, 247, 0.5)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #1565c0, #42a5f5, #81d4fa)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 12px rgba(79, 195, 247, 0.3)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #0d47a1, #1976d2, #4fc3f7)";
                }}
                onClick={() => {
                  window.open("https://github.com/SASTxNST/Nebula", "_blank");
                }}
              >
                Contribute to Github
              </button>
            </>
          )}
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #18182a #181820;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          background: #181820;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #18182a;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #23233a;
        }
      `}</style>
    </div>
  );
};

export default ContributionRanks;
