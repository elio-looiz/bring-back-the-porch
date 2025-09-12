"use client";

import { motion } from "framer-motion";
import { PlayCircle, PauseCircle } from "lucide-react";
import Image from "next/image";
import type { Episode } from "../episodes/components/types";
import { useRef, useState } from "react";

interface Props {
  episode: Episode;
}

export const LatestEpisodeSection = ({ episode }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => setIsPlaying(false);

  return (
    <section id="latest-episode" className="py-20 px-4 bg-[#151515]">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-porch-creamy text-center mb-12"
        >
          Latest Episode
        </motion.h2>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="bg-porch-black p-8 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-8 border border-porch-border"
        >
          {/* Лого вместо обложки */}
          <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden shadow-2xl flex-shrink-0 group">
            <Image
              src="/logo.jpeg"
              alt="Podcast Logo"
              layout="fill"
              objectFit="contain"
              className="bg-[#111]"
            />
            <button
              onClick={handleTogglePlay}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer transition-opacity duration-300"
            >
              {isPlaying ? (
                <PauseCircle className="w-20 h-20 text-porch-green-light hover:text-porch-creamy transition-colors" />
              ) : (
                <PlayCircle className="w-20 h-20 text-porch-green-light hover:text-porch-creamy transition-colors" />
              )}
            </button>
          </div>

          <div className="flex-grow text-center md:text-left">
            <h3 className="text-3xl font-bold text-porch-creamy mb-3">
              {episode.title}
            </h3>
            <p className="text-porch-green-light text-lg mb-4">
              Aired: {episode.date}
            </p>
            <p className="text-porch-grey text-lg mb-6">
              {episode.description}
            </p>

            {/* Аудио элемент */}
            <audio
              ref={audioRef}
              src={episode.audioUrl}
              preload="none"
              onEnded={handleEnded}
              className="w-full mt-2"
              controls
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
