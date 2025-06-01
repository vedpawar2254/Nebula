"use client"

import { useEffect, useRef, useState } from "react";
import fullpage from "fullpage.js";
import "fullpage.js/dist/fullpage.min.css";
import Head from 'next/head';
import CountdownUnit from './components/CountdownUnit';
import { useRouter } from 'next/navigation';
import LoginFormPopup from './components/LoginFormPopup';

import { useInView } from 'react-intersection-observer';

import NebulaHero from "./components/hero/NebulaHero";
import About from "./components/hero/About";
import GitHubShowcase from "./components/hero/GitHubShowcase";
import EventsSection from "./components/hero/EventsSection";
import TeamPage from "./components/hero/TeamPage";
import AutoScrollingTestimonials from "./components/hero/AutoScrollingTestimonials";
import FloatingNavbar from "./components/hero/FloatingNavbar";
import VisualDiary from "./components/hero/VisualDiary";

function Page() {
  const fullpageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  let fpInstance: any;

  const loadFullpage = async () => {
    if (fullpageRef.current) {
      const fullpage = (await import("fullpage.js")).default;
      fpInstance = new fullpage(fullpageRef.current, {
        autoScrolling: true,
        navigation: true,
        anchors: [
          "home",
          "about",
          "showcase",
          "testimonials",
          "events",
          "team",
        ],
        menu: "#navbar-menu",
      });
    }
  };

  loadFullpage();

  return () => {
    if (fpInstance) {
      fpInstance.destroy("all");
    }
  };
}, []);

  const launchDate = new Date('2025-06-01T06:30:00Z').getTime();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  console.log(process);

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

  return (<>
    <div className="relative">
      {/* Always-floating navbar at the top of the screen */}
      <FloatingNavbar showLoginState={{setShowLoginPopup}} />

      {/* Fullpage.js container */}
      <div ref={fullpageRef} id="fullpage">
        <div className="section">
          <NebulaHero />
        </div>
        <div className="section">
          <About />
        </div>
        <div className="section">
          <GitHubShowcase />
        </div>
        <div className="section">
          <AutoScrollingTestimonials />
        </div>
        <div className="section">
          <VisualDiary />
        </div>
        <div className="section">
          <EventsSection />
        </div>
        <div className="section">
          <TeamPage />
        </div>
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
  </>);
}

export default Page;
