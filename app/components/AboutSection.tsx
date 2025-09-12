"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Mic,
  Users,
  Heart,
  Sparkles,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import ParticleAura from "./ParticleAura"; // импорт фоновых частиц

const iconMap: { [key: string]: LucideIcon } = {
  Mic,
  Users,
  Heart,
  Sparkles,
  MapPin,
};

type Topic = {
  icon: string;
  title: string;
  description: string;
};

interface AboutSectionProps {
  topics: Topic[];
}

const VintageMicrophone = () => (
  <svg
    viewBox="0 0 120 180"
    className="w-32 h-48 md:w-40 md:h-64 text-porch-grey drop-shadow-lg"
  >
    <path
      d="M60 110 C 40 110, 40 150, 60 150 S 80 110, 80 150"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <rect x="45" y="145" width="30" height="25" rx="5" fill="currentColor" />
    <path d="M60 170 L 60 180" stroke="currentColor" strokeWidth="5" />
    <rect
      x="30"
      y="30"
      width="60"
      height="80"
      rx="30"
      fill="#1A1A1A"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      d="M35 40 L 85 40 M35 55 L 85 55 M35 70 L 85 70 M35 85 L 85 85"
      stroke="#A0A0A0"
      strokeWidth="3"
    />
    <rect
      x="25"
      y="25"
      width="70"
      height="90"
      rx="35"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
    />
    <path
      d="M25 70 C 5 70, 5 20, 25 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
    />
    <path
      d="M95 70 C 115 70, 115 20, 95 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
    />
  </svg>
);

export const AboutSection = ({ topics }: AboutSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [waveStyles, setWaveStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const styles = Array.from({ length: 10 }).map(() => ({
      width: `${100 + Math.random() * 200}px`,
      height: `${100 + Math.random() * 200}px`,
      animationDuration: `${4 + Math.random() * 2}s`,
      animationDelay: `${Math.random() * 4}s`,
    }));
    setWaveStyles(styles);
  }, []);

  return (
    <section
      id="about"
      className="relative py-20 px-4 bg-porch-black overflow-hidden"
    >
      {/* Живой фон с частицами */}
      <ParticleAura />

      {/* Контент поверх частиц */}
      <div className="relative container mx-auto max-w-6xl z-10">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-porch-creamy text-center mb-12"
        >
          What We Talk About
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-porch-grey text-center max-w-3xl mx-auto mb-16"
        >
          We believe the best ideas are born from simple conversations, just
          like they used to happen on a front porch. Our podcast is a modern
          platform for these heartfelt discussions in Medicine Hat.
        </motion.p>

        <div className="flex flex-col items-center justify-center gap-12">
          {/* Микрофон и волны */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full h-full -translate-x-1/2 -translate-y-1/2">
              {waveStyles.map((style, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 rounded-full bg-porch-green-light/10"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.2, 0], opacity: [1, 0, 0] }}
                  transition={{
                    repeat: Infinity,
                    ease: "easeInOut",
                    duration: parseFloat(style.animationDuration as string),
                    delay: parseFloat(style.animationDelay as string),
                  }}
                  style={{
                    width: style.width,
                    height: style.height,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="z-10"
            >
              <VintageMicrophone />
            </motion.div>
          </div>

          {/* Иконки тем */}
          <div className="flex justify-center flex-wrap gap-4 md:gap-6 z-10">
            {topics.map((topic, index) => {
              const IconComponent = iconMap[topic.icon];
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={topic.title}
                  onClick={() => setActiveIndex(index)}
                  className="p-4 rounded-full cursor-pointer transition-colors duration-300"
                  animate={{
                    backgroundColor: isActive
                      ? "rgb(111 145 114 / 1)"
                      : "rgb(59 82 62 / 1)",
                    scale: isActive ? 1.15 : 1,
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <IconComponent
                    className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${
                      isActive ? "text-porch-black" : "text-porch-creamy"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Описание активной темы */}
          <div className="relative h-24 text-center w-full max-w-xl z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h3 className="text-2xl font-bold text-porch-creamy">
                  {topics[activeIndex].title}
                </h3>
                <p className="text-porch-grey text-lg mt-1">
                  {topics[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
