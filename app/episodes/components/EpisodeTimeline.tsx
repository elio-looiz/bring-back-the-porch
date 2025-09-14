"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Episode } from "./types";
import { EpisodeCard } from "./EpisodeCard";

interface Props {
  episodes: Episode[];
}

// Упрощенный тип: теперь группируем только по годам
type GroupedEpisodes = {
  [year: string]: Episode[];
};

export default function EpisodeTimeline({ episodes }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEpisodes = useMemo(() => {
    if (!searchQuery) {
      return episodes;
    }
    return episodes.filter(
      (ep) =>
        ep.title && ep.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [episodes, searchQuery]);

  // Логика группировки теперь проще: только по году
  const groupedEpisodes = useMemo(() => {
    return filteredEpisodes.reduce<GroupedEpisodes>((acc, episode) => {
      if (!episode.date) return acc;
      const date = new Date(episode.date);
      if (isNaN(date.getTime())) return acc;

      const year = date.getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(episode);
      return acc;
    }, {});
  }, [filteredEpisodes]);

  const sortedYears = Object.keys(groupedEpisodes).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div>
      {/* === Search Section === */}
      <div className="mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-porch-grey" />
          <input
            type="text"
            placeholder="Search episodes by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-porch-border rounded-lg py-3 pl-12 pr-4 text-porch-creamy placeholder-porch-grey focus:outline-none focus:ring-2 focus:ring-porch-green-light"
          />
        </div>
      </div>

      {/* === Episodes Section === */}
      {filteredEpisodes.length > 0 ? (
        <div className="space-y-16">
          {sortedYears.map((year) => (
            <div key={year}>
              {/* Новый, более красивый разделитель для года */}
              <div className="flex items-center text-center mb-10">
                <hr className="flex-grow border-porch-border" />
                <h2 className="px-6 text-4xl font-extrabold text-porch-green-light">
                  {year}
                </h2>
                <hr className="flex-grow border-porch-border" />
              </div>

              {/* Сетка эпизодов для этого года */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {groupedEpisodes[year].map((ep) => (
                  <EpisodeCard key={ep.id} episode={ep} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-porch-creamy">
            No Episodes Found
          </h3>
          <p className="text-porch-grey mt-2">
            Try adjusting your search query.
          </p>
        </div>
      )}
    </div>
  );
}
