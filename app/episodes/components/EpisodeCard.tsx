"use client";

import { Episode } from "./types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

export const EpisodeCard = ({ episode }: { episode: Episode }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-md border border-white/10"
    >
      <div className="relative w-full h-48">
        <Image
          src={episode.coverImage}
          alt={episode.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5 space-y-3">
        <p className="text-sm text-gray-400">{episode.date}</p>
        <h3 className="text-xl font-bold">{episode.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-3">
          {episode.description}
        </p>

        <button
          onClick={() => setShowPlayer(!showPlayer)}
          className="flex items-center gap-2 text-green-400 hover:text-white transition-colors"
        >
          {showPlayer ? <X size={18} /> : <Play size={18} />}
          {showPlayer ? "Close Player" : "Listen Now"}
        </button>

        {showPlayer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4"
          >
            <audio controls src={episode.audioUrl} className="w-full rounded" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
