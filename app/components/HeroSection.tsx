"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Бэкграунд изображение */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/porch-bg.png"
          alt="Cozy porch with warm light"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
          className="filter brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-porch-black to-transparent opacity-80"></div>

        {/* Светящаяся волна */}
        <div className="absolute bottom-0 left-0 w-full h-48 overflow-hidden z-0 pointer-events-none">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-porch-green-light/10 to-transparent"></div>
        </div>
      </div>

      {/* Контент */}
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-6xl md:text-7xl font-extrabold text-porch-creamy leading-tight drop-shadow-lg tracking-tight"
        >
          <span className="bg-gradient-to-br from-porch-creamy to-porch-green-light bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
            Bring Back The Porch
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-porch-creamy max-w-2xl mx-auto drop-shadow-md"
        >
          Heartfelt conversations from Medicine Hat, aimed at strengthening our
          community and fostering genuine connection.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {/* Кнопка Listen (ведёт к секции #latest-episode) */}
          <Link href="#latest-episode" passHref scroll>
            <motion.span
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(77, 107, 80, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-porch-green-dark text-porch-creamy font-semibold py-3 px-8 rounded-full text-lg flex items-center justify-center shadow-lg hover:bg-porch-green-light transition-all duration-300"
            >
              <PlayCircle className="w-6 h-6 mr-2" /> Listen Latest Episode
            </motion.span>
          </Link>

          {/* Кнопка About (ведёт к секции #about) */}
          <Link href="#about" passHref scroll>
            <motion.span
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(242, 240, 229, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-porch-creamy text-porch-creamy font-semibold py-3 px-8 rounded-full text-lg flex items-center justify-center shadow-lg hover:bg-porch-creamy hover:text-porch-green-dark transition-all duration-300"
            >
              Learn More About Us
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
