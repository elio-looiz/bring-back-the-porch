"use client";
import { motion } from "framer-motion";
// Импортируем иконки из lucide-react, которые мы все еще используем
import { Apple, Podcast, Youtube } from "lucide-react";

// Импортируем иконки из @icons-pack/react-simple-icons
// Здесь я импортирую те, которые есть в вашем списке платформ.
// Если вам нужны другие, просто добавьте их сюда.
import {
  SiSpotify,
  SiGooglecast,
  SiOvercast,
  SiCastbox,
  SiPocketcasts,
  SiPlayerfm,
  SiCastro, // Castro может не быть напрямую, но попробуем
  // Нет специфичных для Podcast Index, Goodpods, TrueFans в simple-icons
} from "@icons-pack/react-simple-icons";

// Animation utility
const fadeUp = (d = 0) => ({
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.6, delay: d },
});

export const JoinCommunitySection = () => {
  const socialPlatforms = [
    {
      name: "Apple Podcasts",
      icon: Apple, // Lucide icon
      link: "https://podcasts.apple.com/podcast/id1836303582",
    },
    {
      name: "Spotify",
      icon: SiSpotify, // SimpleIcons icon
      link: "https://open.spotify.com/show/YOUR_SHOW_ID", // Замените на реальную ссылку Spotify
    },
    {
      name: "Google Podcasts",
      icon: SiGooglecast, // SimpleIcons icon
      link: "https://podcasts.google.com/feed/YOUR_FEED_URL",
    },
    {
      name: "Podcast Index",
      icon: Podcast, // Используем общую Lucide Podcast, так как нет специфичной
      link: "https://podcastindex.org/podcast/4297964",
    },
    {
      name: "Overcast",
      icon: SiOvercast, // SimpleIcons icon
      link: "https://overcast.fm/itunes1836303582",
    },
    {
      name: "Castro",
      icon: SiCastro, // SimpleIcons icon
      link: "https://castro.fm/itunes/1836303582",
    },
    {
      name: "Castbox",
      icon: SiCastbox, // SimpleIcons icon
      link: "https://castbox.fm/vic/1836303582?ref=buzzsprout",
    },
    {
      name: "Podchaser",
      icon: Podcast, // SimpleIcons icon
      link: "https://www.podchaser.com/podcasts/bring-back-the-porch-1978721",
    },
    {
      name: "Pocket Casts",
      icon: SiPocketcasts, // SimpleIcons icon
      link: "https://pca.st/42sxmzvt",
    },
    {
      name: "Deezer",
      icon: Podcast, // SimpleIcons icon
      link: "https://www.deezer.com/show/3020752",
    },
    {
      name: "Player FM",
      icon: SiPlayerfm, // SimpleIcons icon
      link: "https://player.fm/series/series-2988166",
    },
    {
      name: "Goodpods",
      icon: Podcast, // Используем общую Lucide Podcast
      link: "https://www.goodpods.com/podcasts-aid/1836303582",
    },
    {
      name: "TrueFans",
      icon: Podcast, // Используем общую Lucide Podcast
      link: "https://truefans.fm/def4b0d4-dfa2-5eb0-8e74-77ba9374a0c3",
    },
    // Добавьте YouTube, если у вас есть канал
    {
      name: "YouTube",
      icon: Youtube, // Lucide icon
      link: "hhttps://www.youtube.com/@bringbacktheporchpodcast",
    },
  ];

  return (
    <section
      id="community"
      className="py-20 px-4 bg-gradient-to-br from-porch-border to-porch-black"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-porch-creamy mb-8"
        >
          Join Our Community
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-porch-grey max-w-3xl mx-auto mb-12"
        >
          Never miss an episode. Subscribe to "Bring Back The Porch" on your
          favorite platform and be a part of the conversation.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          {socialPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center bg-porch-black p-6 rounded-xl shadow-xl hover:bg-porch-green-dark border border-porch-border transition-all duration-300 transform group"
            >
              {/* Рендерим иконку как компонент */}
              <platform.icon className="w-12 h-12 text-porch-green-light mb-3 group-hover:text-porch-creamy transition-colors" />
              <span className="text-lg font-semibold text-porch-creamy">
                {platform.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
