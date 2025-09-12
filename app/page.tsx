import Parser from "rss-parser";

import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { LatestEpisodeSection } from "./components/LatestEpisodeSection";
import { HostsSection } from "./components/HostsSection";
import { JoinCommunitySection } from "./components/JoinCommunitySection";
import type { Episode } from "./episodes/components/types";

// Твои темы
const topics = [
  {
    icon: "Mic",
    title: "Local Voices",
    description: "Sharing stories from our neighbors and community leaders.",
    position: "top-[0%]",
  },
  {
    icon: "Users",
    title: "Community Initiatives",
    description: "Highlighting projects making a difference in Medicine Hat.",
    position: "top-1/3 left-[15%]",
  },
  {
    icon: "Heart",
    title: "Arts & Culture",
    description: "Exploring the vibrant creative scene of our city.",
    position: "top-1/3 left-[85%]",
  },
  {
    icon: "Sparkles",
    title: "Hidden Gems",
    description: "Uncovering the unique places and experiences around us.",
    position: "top-2/3 left-[20%]",
  },
  {
    icon: "MapPin",
    title: "City's History",
    description: "Journeys into the rich past that shaped Medicine Hat.",
    position: "top-2/3 left-[80%]",
  },
];

// Команда
const team = [
  {
    name: "Bernie Leahy",
    role: "Founder",
    bio: "Bernie started Bring Back the Porch as a way to connect with Medicine Hat during the pandemic, a traditional place where conversations flow about all kinds of topics.",
    image: "/host-bernie.jpg",
    hoverText: "Excited to be bringing back the porch to Medicine Hat.",
  },
  {
    name: "Brian Konrad",
    role: "Host",
    bio: "A long time broadcaster, Brian has been on television and radio for over 40 years, delivering the news of the day from home and around the world.",
    image: "/host-brian.jpg",
    hoverText:
      "Looking forward to continuing to tell the history and stories from our town.",
  },
  {
    name: "Lynnette Schneider",
    role: "Producer",
    bio: "As a broadcaster since 2008, she loves finding the smaller stories, from kids raising money for charity to learning about great local food and beverages.",
    image: "/host-lynnette.jpg",
    hoverText:
      "Grateful to have the opportunity to continue to engage with the community.",
  },
  {
    name: "Bob Schneider",
    role: "Videographer",
    bio: "Bob has been capturing visual stories for about 40 years. He has fallen in love with the great landscape of the Badlands and the people who live here.",
    image: "/host-bob.jpg",
    hoverText:
      "Enjoys presenting the interesting visuals our community has to offer.",
  },
  {
    name: "Brittany Streifel",
    role: "Executive",
    bio: "A resident of the area for 27 years and in real estate for over 5. She enjoys kayaking on the river and watching her son play lacrosse.",
    image: "/host-brittany.jpg",
    hoverText:
      "Bringing her knowledge and experiences of the Medicine Hat area to the porch.",
  },
];

// Функция загрузки RSS-эпизодов
const getLatestEpisode = async (): Promise<Episode | null> => {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(process.env.PODCAST_RSS_URL!);

    const episode = feed.items[0];

    return {
      id: episode.guid || episode.link!,
      title: episode.title || "Untitled Episode",
      date: episode.pubDate
        ? new Date(episode.pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Unknown Date",
      description: episode.itunes?.summary || episode.contentSnippet || "",
      coverImage: episode.itunes?.image || "/episode-cover.jpg",
      audioUrl: episode.enclosure?.url || "",
    };
  } catch (error) {
    console.error("Error loading RSS:", error);
    return null;
  }
};

export default async function HomePage() {
  const latestEpisode = await getLatestEpisode();

  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <AboutSection topics={topics} />
      {latestEpisode && <LatestEpisodeSection episode={latestEpisode} />}
      <HostsSection team={team} />
      <JoinCommunitySection />
    </main>
  );
}
