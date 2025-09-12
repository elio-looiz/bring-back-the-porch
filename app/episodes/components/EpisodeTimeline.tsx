"use client";

import { Episode } from "./types";
import { EpisodeCard } from "./EpisodeCard";
import { motion } from "framer-motion";

interface Props {
  episodes: Episode[];
}

export default function EpisodeTimeline({ episodes }: Props) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
      }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {episodes.map((ep) => (
        <EpisodeCard key={ep.id} episode={ep} />
      ))}
    </motion.div>
  );
}
