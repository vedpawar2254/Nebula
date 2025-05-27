"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ContributionChart from '../components/ContributionChart';
import HomeLanding from '../pages/HomeLanding';

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
  const [activeSection, setActiveSection] = useState<'home' | 'ranks'>('home');
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
        
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <div style={{ display: 'flex', color: 'var(--color-text)' }}>
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
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow:
                      '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
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
                        style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00a1ff', marginBottom: '0.25rem', display: 'block' }}
                      >
                        {snapshot.contributors}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Contributors
                      </span>
                    </div>
                    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <span
                        style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00a1ff', marginBottom: '0.25rem', display: 'block' }}
                      >
                        {snapshot.commits}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Commits
                      </span>
                    </div>
                    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <span
                        style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00a1ff', marginBottom: '0.25rem', display: 'block' }}
                      >
                        {snapshot.repositories}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Repositories
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Leaderboard
                    repoOwner={selectedRepo.owner}
                    repoName={selectedRepo.name}
                    repos={repos}
                    onSelectRepo={setSelectedRepo}
                  />
                  <div style={{ marginTop: '1rem' }}>
                    <ContributionChart />
                  </div>
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