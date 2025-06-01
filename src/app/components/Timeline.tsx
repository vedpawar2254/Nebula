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
    <section
      className="w-full px-4 sm:px-6 md:px-12 py-20 bg-black/80 backdrop-blur-xl border-t border-gray-700"
      id="timeline"
    >
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-orbitron">
          The Journey of <span className="text-blue-400">Nebula</span>
        </h2>
      </div>

      <div className="relative border-l-2 border-blue-500 ml-4 sm:ml-6 md:ml-8">
        {timelineData.map((event, index) => (
          <TimelineItem
            key={index}
            title={event.title}
            description={event.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
