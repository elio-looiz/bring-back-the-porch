"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  UsersRound,
  Lightbulb,
  CheckCircle2,
  Quote,
  Target,
  Eye,
  Calendar,
  Rocket,
} from "lucide-react";

// Animation utility
const fadeUp = (d = 0) => ({
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay: d },
});

// Component for the timeline dot
const TimelineDot = () => (
  <div className="absolute left-[-2.1rem] top-[0.1rem] md:left-[-2.6rem]">
    <div className="h-4 w-4 rounded-full bg-porch-black border-2 border-porch-green-light" />
  </div>
);

export default function AboutSection() {
  return (
    <section className="relative bg-porch-black text-porch-creamy overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/grid.svg')] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

      <div className="container mx-auto max-w-5xl px-6 py-24 sm:py-32">
        {/* === SECTION 1: THE TIMELINE & FOUNDERS (This part is unchanged) === */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-24 md:mb-32">
          {/* Left Column: Photo */}
          <motion.div {...fadeUp(0.1)} className="md:sticky md:top-24">
            <div className="relative transform -rotate-3 transition hover:rotate-0 hover:scale-105 duration-300">
              <div className="absolute -inset-2 border-2 border-dashed border-white/20 rounded-2xl" />
              <div className="bg-porch-creamy rounded-2xl p-4 shadow-2xl">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src="/founders-bernie-ina.png"
                    alt="Bernie & Ina Leahy — Founders of Bring Back The Porch"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                    priority
                  />
                </div>
                <figcaption className="mt-3 text-center font-mono text-sm text-porch-black">
                  Bernie & Ina Leahy
                </figcaption>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Timeline Story */}
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold text-porch-green-light mb-4">
              Our Story
            </h1>
            <p className="mb-12 text-lg text-gray-300 leading-relaxed">
              Welcome to Bring Back the Porch! You are welcome to grab a seat
              and listen to what is happening here in Medicine Hat and Area.
            </p>
            <div className="absolute left-[-1.5rem] md:left-[-2rem] top-0 bottom-0 w-0.5 bg-white/10" />
            <div className="space-y-12">
              <motion.div {...fadeUp(0.2)} className="relative pl-8">
                <TimelineDot />
                <div className="flex items-center gap-3 mb-1">
                  <Calendar className="h-5 w-5 text-porch-green-light" />
                  <h3 className="text-xl font-bold">The Founding Idea</h3>
                </div>
                <p className="text-gray-300">
                  When the pandemic was in full swing, Bernie and Ina Leahy were
                  inspired by the idea of the front porch—a place for serious
                  discussions, humorous anecdotes, and neighbourly connections.
                  So, a podcast was created.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.3)} className="relative pl-8">
                <TimelineDot />
                <div className="flex items-center gap-3 mb-1">
                  <Rocket className="h-5 w-5 text-porch-green-light" />
                  <h3 className="text-xl font-bold">The Relaunch</h3>
                </div>
                <p className="text-gray-300">
                  As face-to-face connection returned, the podcast was
                  discontinued. But now, seeing a new opportunity to connect
                  with the community, the Leahy's are re-launching the local
                  podcast "Bring Back The Porch".
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.4)} className="relative pl-8">
                <TimelineDot />
                <div className="flex items-center gap-3 mb-1">
                  <UsersRound className="h-5 w-5 text-porch-green-light" />
                  <h3 className="text-xl font-bold">The Porch Today</h3>
                </div>
                <p className="text-gray-300">
                  The Porch is a place to share a story, a laugh, or relive a
                  great memory from days gone by. We hope you will stay for a
                  while and enjoy the conversations we provide.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* === SECTION 2: STANDOUT QUOTE (Unchanged) === */}
        <motion.div {...fadeUp(0.3)} className="text-center my-24 md:my-32">
          <Quote className="mx-auto h-12 w-12 text-porch-green-light/30" />
          <p className="mt-4 text-3xl md:text-4xl font-bold italic max-w-4xl mx-auto">
            "We believe that there is a lack of thoughtful engaging
            conversations being publicly shared in our community—
            <span className="text-porch-green-light">
              and we think we can change that.
            </span>
            "
          </p>
        </motion.div>

        {/* === NEW SECTION 3: STRUCTURED LIST (Philosophy) === */}
        <div className="relative my-24 md:my-32">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10" />
          <div className="space-y-12">
            <motion.div {...fadeUp(0.4)} className="pl-10 relative">
              <div className="absolute left-[-1.25rem] top-0 p-2 bg-porch-black rounded-full">
                <Target className="h-8 w-8 text-porch-green-light" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                We want to create a space for discussion on various subjects
                that impact the daily lives of the people of Medicine Hat.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="pl-10 relative">
              <div className="absolute left-[-1.25rem] top-0 p-2 bg-porch-black rounded-full">
                <Eye className="h-8 w-8 text-porch-green-light" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                Our team is seeking out people in our community—business people,
                politicians, and community members—to engage in thoughtful and
                interesting conversation and to share their story.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.6)} className="pl-10 relative">
              <div className="absolute left-[-1.25rem] top-0 p-2 bg-porch-black rounded-full">
                <Sparkles className="h-8 w-8 text-porch-green-light" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Our Impact</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                One of our core missions is telling the story of the people who
                live and work here in Medicine Hat. We hope to be a place people
                come to enjoy a laugh, learn something new, or see the other
                side of a debate.
              </p>
            </motion.div>
          </div>
        </div>

        {/* === NEW SECTION 4: SPLIT-PANEL (Key Points) === */}
        <motion.div
          {...fadeUp(0.7)}
          className="mt-24 md:mt-32 rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-3">
            {/* Left Panel */}
            <div className="md:col-span-1 p-8 bg-porch-green-light/5 flex flex-col justify-center items-center text-center">
              <Lightbulb className="h-10 w-10 text-porch-green-light mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold">Key Points</h2>
              <p className="mt-2 text-gray-400">Our promise to you.</p>
            </div>

            {/* Right Panel */}
            <div className="md:col-span-2 p-8 md:p-10">
              <ul className="space-y-6">
                {[
                  "We are local people from our community looking to gather information to share with other members of Medicine Hat.",
                  "We believe there is a need for thoughtful conversations where not only problems are discussed but solutions are discussed too.",
                  "We want to have a respectful place that allows opinions to be shared openly and without an ideological or political agenda.",
                  "We want to have fun and make our podcast a place to really show how fantastic the people are right here in the Hat.",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-porch-green-light" />
                    <span className="text-gray-200 text-base">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
