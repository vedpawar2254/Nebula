"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HomeLanding from '../pages/HomeLanding';

const RepoTabs = dynamic(() => import('../components/RepoTabs'));
const Leaderboard = dynamic(() => import('../components/Leaderboard'));
const Sidebar = dynamic(() => import('../components/Sidebar'));

const fontStyle = {
  fontFamily: "'Orbitron', sans-serif",
};

const ContributionRanks = () => {
  const repos = [
    { owner: 'SASTxNST', name: 'Website_SAST' },
    { owner: 'SASTxNST', name: 'Nebula' },
    { owner: 'SASTxNST', name: 'Sensor Data Visualiser' },
  ];

  const [selectedRepo, setSelectedRepo] = useState(repos[0]);
  const [activeSection, setActiveSection] = useState('home');
  const [snapshot, setSnapshot] = useState({ contributors: 0, commits: 0, repositories: repos.length });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedRepo]);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const [contributorsRes, commitsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${selectedRepo.owner}/${selectedRepo.name}/contributors`),
          fetch(`https://api.github.com/repos/${selectedRepo.owner}/${selectedRepo.name}/commits`),
        ]);

        const contributors = await contributorsRes.json();
        const commits = await commitsRes.json();

        setSnapshot({
          contributors: Array.isArray(contributors) ? contributors.length : 0,
          commits: Array.isArray(commits) ? commits.length : 0,
          repositories: repos.length,
        });
      } catch (error) {
        console.error('Error fetching snapshot data:', error);
      }
    };

    fetchSnapshot();
  }, [selectedRepo]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)),
          url("https://i.postimg.cc/BnBLwG3h/2816786.jpg")
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#fff',
        ...fontStyle,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Sidebar setActiveSection={setActiveSection} />
          <div style={{ flexGrow: 1, padding: '2rem', minHeight: '100vh' }}>
            {activeSection === 'home' && <HomeLanding />}
            {activeSection === 'ranks' && (
              <>
                <div
                  style={{
                    marginBottom: '2rem',
                    borderRadius: '24px',
                    padding: '2rem',
                    position: 'relative',
                    background: 'rgba(255, 0, 64, 0)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 0, 64, 0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,0,64,0.08)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      marginBottom: '1.5rem',
                      background: 'linear-gradient(90deg, #ff4e8a, #ffb199, #ff4e50)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px',
                    }}
                  >
                    🚀 Contribution Activity Snapshot
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                    {[
                      { value: snapshot.contributors, label: 'Contributors' },
                      { value: snapshot.commits, label: 'Commits' },
                      { value: snapshot.repositories, label: 'Repositories' },
                    ].map(({ value, label }) => (
                      <div key={label} style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#ff4e8a',
                            marginBottom: '0.25rem',
                            display: 'block',
                          }}
                        >
                          {value}
                        </span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: '#ffd6e0',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Leaderboard
                    repoOwner={selectedRepo.owner}
                    repoName={selectedRepo.name}
                    repos={repos}
                    onSelectRepo={setSelectedRepo}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionRanks;
