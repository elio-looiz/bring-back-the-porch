import type { Metadata } from "next";
import AboutSection from "./components/AboutSection";

export const metadata: Metadata = {
  title: "About • Bring Back The Porch",
  description:
    "Stories and conversations from Medicine Hat & Area — mission, vision, impact, and our founders’ story.",
};

export default function AboutPage() {
  return <AboutSection />;
}
