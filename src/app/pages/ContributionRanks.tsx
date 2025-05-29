"use client";

import React, { useEffect, useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import HomeLanding from '../pages/HomeLanding';
import Contact from '../pages/Contact';
import FAQ from '../pages/FAQ';
import { useRouter } from 'next/router';
import Profile from './Profile';

interface Repo {
  owner: string;
  name: string;
}

interface ProfileProps {
  repositories: Repo[];
}

const RepoTabs = dynamic(() => import('../components/RepoTabs'));
const Leaderboard = dynamic(() => import('../components/Leaderboard'));
const Sidebar = dynamic(() => import('../components/Sidebar'));

const ContributionRanks: React.FC = () => {
  const repos: Repo[] = [
    { owner: 'SASTxNST', name: 'Website_SAST' },
    { owner: 'SASTxNST', name: 'Nebula' },
    { owner: 'SASTxNST', name: 'Sensor Data Visualiser' },
  ];
  const router = useRouter();
  const [selectedRepo, setSelectedRepo] = useState<Repo>(repos[0]);
  const [activeSection, setActiveSection] = useState<'home' | 'ranks' | 'contact' | 'faq' | 'login' | 'profile'>('home');
  const [snapshot, setSnapshot] = useState({ contributors: 0, commits: 0, repositories: repos.length });

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [githubId, setGithubId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);

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

  const showMessage = (msg: string, type: 'success' | 'error' | 'info' = 'success'): void => {
    setMessage(msg);
    setShowMessageBox(true);
    setTimeout(() => {
      setShowMessageBox(false);
      setMessage('');
    }, 3000);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setMessage('');
    setShowMessageBox(false);

    if (isLogin) {
      if (!email || !password) {
        showMessage('Please fill in all login fields.', 'error');
        return;
      }
      showMessage('Logging in..', 'info');
      console.log('Login Data:', { email, password });
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          showMessage(data.message || 'Login successful!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', email);
          setActiveSection('ranks');
          router.reload();
        } else {
          showMessage(data.message || 'Login failed.', 'error');
        }
      } catch (error: any) {
        showMessage('An error occurred during login.', 'error');
        console.error('Login error:', error);
      }
    } else {
      if (!username || !email || !password) {
        showMessage('Please fill in all signup fields.', 'error');
        return;
      }
      showMessage('Signup attempt (check console)', 'info');
      console.log('Signup Data:', { username, email, githubId, password });
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, githubId, password }),
        });
        const data = await response.json();
        if (response.ok) {
          showMessage(data.message || 'Signup successful! Please log in.');
          setIsLogin(true);
        } else {
          showMessage(data.message || 'Signup failed.', 'error');
        }
      } catch (error: any) {
        showMessage('An error occurred during signup.', 'error');
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <div style={{}}>
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
                </div>
              </>
            )}
            {
              activeSection === 'login' && (
                <div className="flex items-center justify-center min-h-screen p-4 bg-[#0C0C0C]">
                  <div className={`fixed left-1/2 top-5 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${showMessageBox ? 'block opacity-100' : 'hidden opacity-0'}`}>
                    {message}
                  </div>

                  <div className="flex flex-col overflow-hidden bg-[#0E0E2F] rounded-xl shadow-2xl md:flex-row max-w-4xl w-full">
                    <div className="flex flex-col items-center justify-center p-8 text-white bg-gradient-to-br from-[#0088CC] to-[#00B2FF] md:w-1/2">
                      <h2 className="mb-4 text-4xl font-bold text-center">
                        {isLogin ? 'Welcome Back!' : 'Join Us!'}
                      </h2>
                      <p className="mb-6 text-lg text-center">
                        {isLogin ? 'Sign in to continue your journey.' : 'Create an account and start your adventure.'}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-8 md:w-1/2">
                      <h3 className="mb-6 text-3xl font-bold text-gray-200">
                        {isLogin ? 'Login' : 'Signup'}
                      </h3>

                      <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        {!isLogin && (
                          <div className="mb-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-semibold text-gray-300">
                              Username
                            </label>
                            <input
                              type="text"
                              id="username"
                              className="w-full px-4 py-3 leading-tight text-gray-200 transition duration-200 bg-[#0E0E2F] border border-gray-700 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:border-transparent"
                              placeholder="Your username"
                              value={username}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                              required={!isLogin}
                            />
                          </div>
                        )}

                        <div className="mb-4">
                          <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 leading-tight text-gray-200 transition duration-200 bg-[#0E0E2F] border border-gray-700 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:border-transparent"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        {!isLogin && (
                          <div className="mb-4">
                            <label htmlFor="githubId" className="block mb-2 text-sm font-semibold text-gray-300">
                              GitHub ID (Optional)
                            </label>
                            <input
                              type="text"
                              id="githubId"
                              className="w-full px-4 py-3 leading-tight text-gray-200 transition duration-200 bg-[#0E0E2F] border border-gray-700 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:border-transparent"
                              placeholder="Your GitHub ID"
                              value={githubId}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithubId(e.target.value)}
                            />
                          </div>
                        )}

                        <div className="mb-6">
                          <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-300">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 leading-tight text-gray-200 transition duration-200 bg-[#0E0E2F] border border-gray-700 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:border-transparent"
                            placeholder="********"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full cursor-pointer bg-[#00B2FF] hover:bg-[#0099CC] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md"
                        >
                          {isLogin ? 'Login' : 'Signup'}
                        </button>
                      </form>

                      <div className="mt-6 text-center">
                        <p className="text-gray-400">
                          {isLogin ? "Don't have an account?" : "Already have an account?"}
                          <button
                            onClick={() => {
                              setIsLogin(!isLogin);
                              setUsername('');
                              setEmail('');
                              setGithubId('');
                              setPassword('');
                              setMessage('');
                              setShowMessageBox(false);
                            }}
                            className="ml-1 font-semibold text-[#00B2FF] cursor-pointer focus:outline-none hover:text-[#0099CC]"
                          >
                            {isLogin ? 'Signup here' : 'Login here'}
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {
              activeSection === 'profile' && (
                <Profile repositories={repos} />
              )
            }
            {activeSection === 'contact' && <Contact />}
            {activeSection === 'faq' && <FAQ />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionRanks;
