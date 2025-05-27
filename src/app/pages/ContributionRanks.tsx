// ✅ TypeScript + ESLint-compatible version of ContributionRanks.tsx
"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const RepoTabs = dynamic(() => import('../components/RepoTabs'));
const Leaderboard = dynamic(() => import('../components/Leaderboard'));
const Sidebar = dynamic(() => import('../components/Sidebar'));

interface Repo {
  owner: string;
  name: string;
}

const ContributionRanks: React.FC = () => {
  const repos: Repo[] = [
    { owner: 'SASTxNST', name: 'Website_SAST' },
    { owner: 'SASTxNST', name: 'CubeSat_Prototype' },
    { owner: 'SASTxNST', name: 'RocketSim' },
  ];

  const [selectedRepo, setSelectedRepo] = useState<Repo>(repos[0]);
  const [activeSection, setActiveSection] = useState<'ranks' | string>('ranks');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedRepo]);

  return (
    <div style={{ display: 'flex', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <Sidebar setActiveSection={setActiveSection} />
      <div style={{ flexGrow: 1, padding: '2rem', minHeight: '100vh' }}>
        {activeSection === 'ranks' ? (
          <>
            <div
              style={{
                marginBottom: '2rem',
                borderRadius: '24px',
                padding: '2rem',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(0, 161, 255, 0.3), rgba(0, 102, 204, 0.2))',
                    top: '10%',
                    right: '15%',
                    filter: 'blur(1px)',
                    animation: 'float 6s ease-in-out infinite',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(0, 161, 255, 0.3), rgba(0, 102, 204, 0.2))',
                    bottom: '20%',
                    left: '10%',
                    filter: 'blur(1px)',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: '2s',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(0, 161, 255, 0.3), rgba(0, 102, 204, 0.2))',
                    top: '60%',
                    right: '30%',
                    filter: 'blur(1px)',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: '4s',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  letterSpacing: '0.5px',
                }}
              >
                🚀 Contribution Activity Snapshot
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#00a1ff',
                      marginBottom: '0.25rem',
                      display: 'block',
                    }}
                  >
                    12
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Contributors
                  </span>
                </div>
                <div
                  style={{
                    width: '1px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#00a1ff',
                      marginBottom: '0.25rem',
                      display: 'block',
                    }}
                  >
                    89
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Commits
                  </span>
                </div>
                <div
                  style={{
                    width: '1px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#00a1ff',
                      marginBottom: '0.25rem',
                      display: 'block',
                    }}
                  >
                    3
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Repositories
                  </span>
                </div>
              </div>
            </div>

            <Leaderboard
              repoOwner={selectedRepo.owner}
              repoName={selectedRepo.name}
              repos={repos}
              onSelectRepo={setSelectedRepo}
            />
          </>
        ) : (
          <div style={{ color: 'var(--color-text-secondary)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section coming soon...
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionRanks;