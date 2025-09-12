"use client";
import { motion } from "framer-motion";
import { Podcast, Apple, Youtube } from "lucide-react";

export const JoinCommunitySection = () => {
  const socialPlatforms = [
    {
      name: "Apple Podcasts",
      icon: Apple,
      link: "https://podcasts.apple.com/podcast/id1836303582",
    },
    {
      name: "Spotify",
      icon: Podcast,
      link: "https://open.spotify.com/show/4JBzsCpsyJ0DdcuUEnTELd",
    },
    {
      name: "Google Podcasts",
      icon: Podcast,
      link: "https://podcasts.google.com/feed/YOUR_FEED_URL",
    },
    {
      name: "Podcast Index",
      icon: Podcast,
      link: "https://podcastindex.org/podcast/4297964",
    },
    {
      name: "Overcast",
      icon: Podcast,
      link: "https://overcast.fm/itunes1836303582",
    },
    {
      name: "Castro",
      icon: Podcast,
      link: "https://castro.fm/itunes/1836303582",
    },
    {
      name: "Castbox",
      icon: Podcast,
      link: "https://castbox.fm/vic/1836303582?ref=buzzsprout",
    },
    {
      name: "Podchaser",
      icon: Podcast,
      link: "https://www.podchaser.com/podcasts/bring-back-the-porch-1978721",
    },
    { name: "Pocket Casts", icon: Podcast, link: "https://pca.st/42sxmzvt" },
    {
      name: "Deezer",
      icon: Podcast,
      link: "https://www.deezer.com/show/3020752",
    },
    {
      name: "Player FM",
      icon: Podcast,
      link: "https://player.fm/series/series-2988166",
    },
    {
      name: "Goodpods",
      icon: Podcast,
      link: "https://www.goodpods.com/podcasts-aid/1836303582",
    },
    {
      name: "TrueFans",
      icon: Podcast,
      link: "https://truefans.fm/def4b0d4-dfa2-5eb0-8e74-77ba9374a0c3",
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
          Never miss an episode. Subscribe to &quot;Bring Back The Porch&quot;
          on your favorite platform and be a part of the conversation.
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
