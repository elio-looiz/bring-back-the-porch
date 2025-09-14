import { getSortedPostsData } from "../lib/posts";
import BlogList from "./components/BlogList";
import ParticlesBackground from "./components/ParticlesBackground";

export default async function BlogPage() {
  // This function runs on the server.
  // It's already synchronous in your lib/posts.ts, but making the page async is good practice.
  const allPosts = getSortedPostsData();

  // Pass the server-fetched data as a prop to the client component
  return (
    <div>
      <ParticlesBackground />
      <BlogList allPosts={allPosts} />
    </div>
  );
}
