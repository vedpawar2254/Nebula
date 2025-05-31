"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CountdownUnit from './components/CountdownUnit';
import About from './components/About';
import { useRouter } from 'next/navigation';
import LoginFormPopup from './components/LoginFormPopup';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const launchDate = new Date('2025-06-01T18:30:00Z').getTime();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [prevSeconds, setPrevSeconds] = useState<number | null>(null);
  const router = useRouter();
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(current => {
          setPrevSeconds(current.seconds);
          return { days, hours, minutes, seconds };
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setPrevSeconds(0);
      }
    };

    calculateTimeRemaining();
    const intervalId = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [launchDate]);

  const handleContributeClick = () => {
    if (isLoggedIn) {
      router.push('/contribution-ranks');
    } else {
      setShowLoginPopup(true);
    }
  };

  const secondsKey =
    prevSeconds !== null && timeRemaining.seconds !== prevSeconds
      ? `sec-${timeRemaining.seconds}-${Date.now()}`
      : `sec-${timeRemaining.seconds}`;

  if (!isClient) return null;

  const backgroundImageUrl = '/nebula.png';

  return (
    <>
      <Head>
        <title>NEBULA - Coming Soon</title>
        <meta name="description" content="Nebula is launching soon! Countdown to the future." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 🔧 Common background and dark overlay */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center text-gray-200"
        style={{
          backgroundImage: "url(/nebula.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Black overlay covering both sections */}
        <div className="absolute inset-0 bg-black/65 z-0" />

        {/* All content above the overlay */}
        <div className="relative z-10">

        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
          <button
            onClick={() => setShowLoginPopup(true)}
            className="relative w-28 px-4 py-2 overflow-hidden text-sm font-semibold text-white transition-all duration-300 bg-transparent border-2 border-white rounded-full cursor-pointer h-12 font-orbitron group hover:border-blue-400"
          >
            <span className="absolute top-0 left-0 w-full h-full transition-transform duration-500 origin-left transform scale-x-0 bg-blue-600 rounded-full group-hover:scale-x-100"></span>
            <span className="absolute top-0 left-0 w-full h-full transition-transform duration-700 delay-75 origin-left transform scale-x-0 bg-blue-500 rounded-full group-hover:scale-x-100"></span>
            <span className="absolute top-0 left-0 w-full h-full transition-transform delay-150 origin-left transform scale-x-0 bg-blue-400 rounded-full group-hover:scale-x-100 duration-900"></span>

            <div className="relative z-20 flex items-center justify-center w-full h-full">
              <span className="transition-opacity duration-300 group-hover:opacity-0">Login</span>
              <span className="absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                Welcome!
              </span>
            </div>
          </button>
        </div>

          {/* 🟦 Countdown Section */}
          <section className="w-full h-screen flex flex-col items-center justify-center text-center">
            {showLoginPopup && (
              <div className="fixed inset-0 z-40 bg-opacity-20 bg-white/5 backdrop-blur-2xl"></div>
            )}

            <div className="absolute left-0 right-0 top-8 sm:top-12">
              <p className="text-2xl tracking-wider text-gray-300 sm:text-3xl font-orbitron">
                Introducing
              </p>
            </div>

            <main className="z-10 flex flex-col items-center w-full px-4 mt-12 sm:mt-16">
              <h1 className="mb-10 text-6xl font-black tracking-widest uppercase font-orbitron sm:text-7xl md:text-8xl lg:text-9xl sm:mb-12 nebula-text-effect">
                NEBULA
              </h1>

              {timeRemaining.days === 0 &&
              timeRemaining.hours === 0 &&
              timeRemaining.minutes === 0 &&
              timeRemaining.seconds === 0 ? (
                <p className="mb-6 text-4xl font-bold text-gray-100 font-orbitron sm:text-5xl md:text-6xl animate-bounce">
                  LAUNCHED!
                </p>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-start justify-center mb-4 sm:mb-6 group">
                    <CountdownUnit value={timeRemaining.days} unit="Days" showSeparator={true} />
                    <CountdownUnit value={timeRemaining.hours} unit="Hours" showSeparator={true} />
                    <CountdownUnit value={timeRemaining.minutes} unit="Minutes" showSeparator={true} />
                    <div
                      className={timeRemaining.seconds !== prevSeconds ? 'digit-change' : ''}
                      key={secondsKey}
                    >
                      <CountdownUnit value={timeRemaining.seconds} unit="Seconds" showSeparator={false} />
                    </div>
                  </div>

                  <p className="mb-6 text-xl tracking-wide text-gray-300 sm:text-2xl font-orbitron sm:mb-8">
                    Coming Soon...
                  </p>

                  <button
                    onClick={handleContributeClick}
                    className="relative w-48 px-6 py-3 mx-auto my-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 bg-transparent border-2 border-white rounded-full cursor-pointer h-14 font-orbitron group hover:border-blue-400 md:my-6 lg:my-8"
                  >
                    <span className="absolute top-0 left-0 w-full h-full transition-transform duration-500 origin-left transform scale-x-0 bg-blue-600 rounded-full group-hover:scale-x-100"></span>
                    <span className="absolute top-0 left-0 w-full h-full transition-transform duration-700 delay-75 origin-left transform scale-x-0 bg-blue-500 rounded-full group-hover:scale-x-100"></span>
                    <span className="absolute top-0 left-0 w-full h-full transition-transform delay-150 origin-left transform scale-x-0 bg-blue-400 rounded-full group-hover:scale-x-100 duration-900"></span>

                    <div className="relative z-20 flex items-center justify-center w-full h-full">
                      <span className="transition-opacity duration-300 group-hover:opacity-0">Contribute</span>
                      <span className="absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Let's Go!
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </main>
          </section>

          {/* 🟨 About Section - no background */}
          <section className="w-full px-6 sm:px-12 py-20">
            <motion.div
              ref={aboutRef}
              initial={{ opacity: 0, y: 50 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <About />cs
            </motion.div>
          </section>

           {/* Footer */}
          <footer className="w-full py-6 text-center bg-black text-gray-400 z-10">
            <p className="text-xl sm:text-2xl font-orbitron">By SAST</p>
          </footer>

        </div>
      </div>

      

      {showLoginPopup && (
        <LoginFormPopup
          onClose={() => setShowLoginPopup(false)}
          onLoginSuccess={(token: any, email: string) => {
            setIsLoggedIn(true);
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            setShowLoginPopup(false);
            router.push('/contribution-ranks');
          }}
        />
      )}
    </>
  );
};

export default HomePage;
