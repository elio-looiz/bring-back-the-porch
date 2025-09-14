import { getPostData } from "../../lib/posts";
import { notFound } from "next/navigation";
import ParticlesBackground from "../components/ParticlesBackground";

interface PostProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostProps) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  return (
    <>
      <ParticlesBackground />
      <section className="relative text-porch-creamy">
        <div className="container mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <article>
            <h1 className="text-4xl md:text-5xl font-extrabold text-porch-green-light mb-4">
              {postData.title}
            </h1>
            <div className="mb-8 text-porch-grey">
              <span>
                {new Date(postData.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span> • by {postData.author}</span>
            </div>

            {/* This renders the HTML from your markdown file */}
            <div
              className="prose prose-invert prose-lg max-w-none prose-h2:text-porch-green-light prose-a:text-porch-green-light"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </article>
        </div>
      </section>
    </>
  );
}
