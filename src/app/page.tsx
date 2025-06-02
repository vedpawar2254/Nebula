"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FloatingNavbar from "./components/hero/FloatingNavbar";
import NebulaHero from "./components/hero/NebulaHero";
import About from "./components/hero/About";
import GitHubShowcase from "./components/hero/GitHubShowcase";
import AutoScrollingTestimonials from "./components/hero/AutoScrollingTestimonials";
import VisualDiary from "./components/hero/VisualDiary";
import EventsSection from "./components/hero/EventsSection";
import TeamPage from "./components/hero/TeamPage";
import LoginFormPopup from "./components/LoginFormPopup";
import Footer from "./components/hero/Footer";

function Page() {
  const launchDate = new Date("2025-06-01T06:30:00Z").getTime();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prevSeconds, setPrevSeconds] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining((current) => {
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
      router.push("/contribution-ranks");
    } else {
      setShowLoginPopup(true);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <FloatingNavbar showLoginState={{ setShowLoginPopup }} />

      <main className="w-full">
        <section className="min-h-screen">
          <NebulaHero />
        </section>
        <section className="min-h-screen">
          <About />
        </section>
        <section className="min-h-screen">
          <GitHubShowcase />
        </section>
        <section className="min-h-screen">
          <AutoScrollingTestimonials />
        </section>
        <section className="min-h-screen">
          <VisualDiary />
        </section>
        <section className="min-h-screen">
          <EventsSection />
        </section>
        <section className="min-h-screen">
          <TeamPage />
        </section>
        <Footer />
      </main>

      {showLoginPopup && (
        <LoginFormPopup
          onClose={() => setShowLoginPopup(false)}
          onLoginSuccess={(token: any, email: string) => {
            setIsLoggedIn(true);
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            setShowLoginPopup(false);
            router.push("/contribution-ranks");
          }}
        />
      )}
    </>
  );
}

export default Page;
