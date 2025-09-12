"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "links",
        background: {
          color: {
            value: "#0f0f0f", // или прозрачный, если используешь градиент
          },
        },
        fullScreen: { enable: true, zIndex: 0 },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#7fffd4",
            distance: 120,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
          number: {
            value: 45,
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
}
