import EpisodeTimeline from "./components/EpisodeTimeline";
import type { Episode } from "./components/types";
import Parser from "rss-parser";
import ParticlesBackground from "./components/ParticlesBackground";

// Загрузка RSS
const getEpisodes = async (): Promise<Episode[]> => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.PODCAST_RSS_URL!);
  return feed.items.map((item) => ({
    id: item.guid || item.link!,
    title: item.title || "Untitled Episode",
    date: item.pubDate
      ? new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown",
    description: item.itunes?.summary || item.contentSnippet || "",
    coverImage: item.itunes?.image || "/episode-cover-placeholder.png",
    audioUrl: item.enclosure?.url || "",
  }));
};

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <ParticlesBackground />
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-6">🎙 Episodes</h1>
        <p className="text-center text-gray-400 mb-10">
          Every episode is a porch conversation worth hearing.
        </p>
        <EpisodeTimeline episodes={episodes} />
      </div>
    </div>
  );
}
