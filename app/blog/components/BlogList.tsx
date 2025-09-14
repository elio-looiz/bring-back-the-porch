"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";

type Post = {
  slug: string;
  date: string;
  title: string;
  author: string;
  excerpt: string;
};

interface BlogListProps {
  allPosts: Post[];
}

// 1. Define animation variants for the container and its items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This will make each child animate 0.1s after the previous one
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function BlogList({ allPosts }: BlogListProps) {
  return (
    <section className="relative text-porch-creamy">
      {/* <ParticlesBackground /> */}
      <div className="container mx-auto max-w-3xl px-6 py-24 sm:py-32 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-porch-green-light text-center mb-4">
            The Blog
          </h1>
          <p className="text-lg text-gray-300 text-center mb-16">
            Thoughts, stories, and updates from the porch.
          </p>
        </motion.div>

        {/* 2. Apply the container variants to the parent div */}
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.isArray(allPosts) &&
            allPosts.map(({ slug, date, title, author, excerpt }) => (
              // 3. Apply the item variants to the child. No more whileInView needed!
              <motion.article key={slug} variants={itemVariants}>
                <div className="mb-2">
                  <span className="text-porch-grey">
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-porch-grey"> • by {author}</span>
                </div>
                <h2 className="text-3xl font-bold mb-3 text-porch-creamy hover:text-porch-green-light transition-colors">
                  <Link href={`/blog/${slug}`}>{title}</Link>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">{excerpt}</p>
                <Link
                  href={`/blog/${slug}`}
                  className="font-bold text-porch-green-light hover:underline"
                >
                  Read More →
                </Link>
              </motion.article>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
