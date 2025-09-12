"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Episodes", href: "/episodes" },
    { label: "Hosts", href: "/hosts" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-porch-black bg-opacity-80 backdrop-blur-sm p-4 shadow-lg"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-3"
        >
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="text-2xl font-extrabold text-porch-green-light hover:text-porch-creamy transition-colors">
              Bring Back The Porch
            </span>
          </Link>
        </motion.div>

        <motion.ul
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-6 text-lg"
        >
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors ${
                  pathname === href
                    ? "text-porch-green-light"
                    : "hover:text-porch-green-light text-porch-creamy"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </motion.ul>
      </nav>
    </motion.header>
  );
};
