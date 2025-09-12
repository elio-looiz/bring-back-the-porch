"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFireflyPreset } from "tsparticles-preset-firefly";

export default function ParticleAura() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFireflyPreset(engine);
  }, []);

  return (
    <Particles
      id="firefly"
      init={particlesInit}
      options={{
        preset: "firefly",
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: "#00000000",
          },
        },
        particles: {
          color: {
            value: "#7fffd4",
          },
        },
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
