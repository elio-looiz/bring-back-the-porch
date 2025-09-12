"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

type Host = {
  name: string;
  role: string;
  image: string;
  description: string;
};

const hosts: Host[] = [
  {
    name: "Bernie Leahy",
    role: "Founder",
    image: "/host-bernie.jpg",
    description:
      "Bernie started Bring Back The Porch as a way to connect with Medicine Hat during the pandemic. Together with his wife Ina, they set out to connect with the community by bringing back the porch — a traditional place where conversations flow about all kinds of topics.",
  },
  {
    name: "Brian Konrad",
    role: "Host",
    image: "/host-brian.jpg",
    description:
      "A long-time broadcaster with over 40 years of experience on TV and radio. Brian has been at the forefront of Medicine Hat's biggest news stories — from train crashes and floods to fires and community events.",
  },
  {
    name: "Lynnette Schneider",
    role: "Producer",
    image: "/host-lynnette.jpg",
    description:
      "Since 2008, Lynnette has been part of the Medicine Hat community as a broadcaster, covering everything from provincial elections to local sports teams and community tragedies.",
  },
  {
    name: "Bob Schneider",
    role: "Videographer",
    image: "/host-bob.jpg",
    description:
      "Bob has been capturing visual stories for about 40 years and fell in love with the Medicine Hat area’s landscapes and people 18 years ago.",
  },
  {
    name: "Brittany Streifel",
    role: "Executive",
    image: "/host-brittany.jpg",
    description:
      "A long-time resident of the Medicine Hat area with over 5 years in real estate, Brittany loves kayaking, Cypress Hills adventures, and spending time with her family.",
  },
];

export default function HostsPage() {
  // индексы секций: 0 — интро, 1..N — хосты, N+1 — финал
  const sectionsCount = hosts.length + 2;
  const [active, setActive] = useState(0);

  // refs для секций
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  sectionRefs.current = useMemo(
    () => new Array(sectionsCount).fill(null),
    [sectionsCount]
  );

  // инициализация пресета частиц
  const particlesInit = useCallback(async (engine: any) => {
    await loadLinksPreset(engine);
  }, []);

  // IntersectionObserver для подсветки текущей секции
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // находим ту, что больше всего видна
        let maxRatio = 0;
        let currentIndex = active;

        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.index);
          if (e.intersectionRatio > maxRatio) {
            maxRatio = e.intersectionRatio;
            currentIndex = idx;
          }
        });

        if (currentIndex !== active) setActive(currentIndex);
      },
      {
        root: container,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0..1
      }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  // скролл к секции
  const scrollToIndex = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (!el || !containerRef.current) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={containerRef}
      className="scroll-container relative h-screen bg-porch-black text-porch-creamy overflow-y-auto snap-y snap-mandatory scroll-smooth"
    >
      {/* фон-частицы */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="pointer-events-none absolute inset-0 z-0"
        options={{
          preset: "links",
          background: { color: "transparent" },
          particles: {
            color: { value: "#6ee7b7" },
            links: { enable: true, color: "#6ee7b7", distance: 140 },
            move: { enable: true, speed: 0.7 },
            size: { value: 2 },
            opacity: { value: 0.35 },
          },
          interactivity: { events: { onHover: { enable: false } } },
        }}
      />

      {/* ПРАВАЯ НАВИГАЦИЯ — только десктоп */}
      <nav className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-3">
        {Array.from({ length: sectionsCount }).map((_, i) => {
          const isActive = active === i;
          // подписи для интро/финала
          const label =
            i === 0
              ? "Intro"
              : i === sectionsCount - 1
              ? "Team"
              : hosts[i - 1].name.split(" ")[0]; // короткое имя
          return (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="group flex items-center gap-2"
              aria-label={`Go to ${label}`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  isActive
                    ? "bg-porch-creamy scale-150"
                    : "bg-porch-border group-hover:bg-porch-creamy/70"
                }`}
              />
              <span
                className={`text-s tracking-wide opacity-0 group-hover:opacity-100 transition-opacity ${
                  isActive ? "opacity-100 text-porch-creamy" : "text-porch-grey"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ---- СЕКЦИИ ---- */}

      {/* 0 — интро */}
      <section
        data-index={0}
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="relative h-screen snap-start snap-always flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Meet Our Amazing Team
        </h1>
        <p className="text-porch-grey text-lg max-w-xl mt-4">
          Now we’ll introduce you to the people behind{" "}
          <span className="text-porch-green-light">Bring Back The Porch</span>.
        </p>
        <div className="mt-8 text-porch-green-light select-none animate-bounce">
          Scroll down
        </div>
      </section>

      {/* 1..N — хосты */}
      {hosts.map((host, i) => {
        const idx = i + 1;
        return (
          <section
            key={host.name}
            data-index={idx}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            className="relative h-screen snap-start snap-always flex flex-col items-center justify-center text-center px-6 z-10"
          >
            <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-porch-green-light shadow-lg mb-5">
              <Image
                src={host.image}
                alt={host.name}
                fill
                className="object-cover brightness-95"
              />
            </div>

            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                {host.name}
              </h2>
              <p className="text-porch-green-light font-semibold text-base md:text-lg mb-4">
                {host.role}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-porch-creamy/90">
                {host.description}
              </p>
            </div>
          </section>
        );
      })}

      {/* финал */}
      <section
        data-index={sectionsCount - 1}
        ref={(el) => {
          sectionRefs.current[sectionsCount - 1] = el;
        }}
        className="relative h-screen snap-start snap-always flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-porch-green-dark to-porch-black z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
          We Are One Team
        </h2>

        {/* Ряд всех хостов */}
        <div className="w-full max-w-5xl overflow-x-auto">
          <div className="flex flex-wrap items-start justify-center gap-6 md:gap-10 px-2 md:px-4">
            {hosts.map((h) => (
              <div
                key={h.name}
                className="flex flex-col items-center min-w-[120px]"
              >
                <div className="relative w-20 h-20 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-porch-creamy/40 shadow">
                  <Image
                    src={h.image}
                    alt={h.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-sm md:text-base">
                  <div className="font-semibold">{h.name}</div>
                  <div className="text-porch-green-light">{h.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button
            onClick={() => scrollToIndex(0)}
            className="mt-12 rounded-full border border-porch-creamy px-6 py-3 text-sm md:text-base hover:bg-porch-creamy hover:text-porch-green-dark transition"
          >
            We’re waiting for you on the porch — come visit!
          </button>
        </div>
      </section>
    </div>
  );
}
