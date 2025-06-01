"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const timelineData = [
  {
    title: "Nebula Launch 🚀",
    description:
      "Nebula was born from a simple idea — making open-source contributions accessible, rewarding, and exciting.",
  },
  {
    title: "Community Collaboration 🤝",
    description:
      "Dozens of passionate contributors joined forces to fix bugs, enhance UI, and create learning resources for beginners.",
  },
  {
    title: "Hacktoberfest Integration 🎃",
    description:
      "Nebula became an official project in Hacktoberfest, gaining hundreds of meaningful contributions and visibility.",
  },
  {
    title: "Introducing DCoins 💰",
    description:
      "To reward contributors, we launched DCoins — a virtual currency for completing tasks and climbing the leaderboard.",
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TimelineItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="pl-6 pr-4 py-10 relative"
    >
      <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-[-10px] top-10 sm:left-[-10px] sm:top-10 shadow-lg" />
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 font-orbitron">
        {title}
      </h3>
      <p className="text-gray-300 text-sm sm:text-base max-w-3xl">{description}</p>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section className="w-full px-6 sm:px-12 py-24 relative">
        <div className="absolute inset-0  z-0" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white font-orbitron mb-20">
            Event Timeline
          </h2>

          <div className="relative border-l-2 border-gray-600 pl-6 ml-4">
            {[
              {
                step: '0.00',
                title: 'Hello World!',
                date: '27 March, 2025',
                description:
                  'The event begins with an official announcement, introducing participants to DCoins, how they can be earned, and teaser posts about the Reverse Bug Hunt.',
                },
              {
                step: '0.01',
                title: 'Open Source Traversal',
                date: '28 March, 2025',
                description:
                  'Participants engage in an open-source challenge, solving riddles, exploring repositories, and taking part in a fun quiz to earn DCoins.',
                },
              {
                step: '0.02',
                title: 'Bug Smash Arena',
                date: '30 March, 2025',
                description:
                  'A real-time bug hunt where participants fix issues across selected repositories and compete to top the contributor chart.',
                },
              {
                step: '0.03',
                title: 'Mentorship AMA',
                date: '1 April, 2025',
                description:
                  'Top open-source mentors share experiences and answer participant questions in a relaxed fireside AMA session.',
                },
              {
                step: '0.04',
                title: 'Final Showcase & Rewards',
                date: '5 April, 2025',
                description:
                  'Final presentations, leaderboard highlights, rewards ceremony, and a sneak peek into future open-source roadmaps.',
                },
            ].map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
                className="mb-16 relative"
              >
                {/* Dot */}
                <div className="absolute -left-[10px] w-3 h-3 bg-blue-500 rounded-full" />

                {/* Content */}
                <div>
                  <div className="mb-2 text-sm text-gray-400">{event.step}</div>
                  <h3 className="text-2xl font-semibold text-white font-orbitron mb-1">
                    {event.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-400">{event.date}</p>
                  <p className="text-base text-gray-300 max-w-2xl">{event.description}</p>
                </div>

                {/* Optional ASCII mascot or decoration */}
                <div className="absolute right-[-80px] top-0 hidden sm:block opacity-20 text-white text-xs leading-none whitespace-pre font-mono select-none pointer-events-none">
      {`    .--.
        |o_o |
        |:_/ |
        //   \\ \\
        (|     | )
        /'\\_   _/\\'
        \\___)=(___/`}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Timeline;
