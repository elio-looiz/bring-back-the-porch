import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Импортируем компоненты
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bring Back The Porch Podcast | Medicine Hat Community",
  description:
    "Heartfelt conversations from Medicine Hat, aimed at strengthening our community and fostering connection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-porch-black text-porch-creamy antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
