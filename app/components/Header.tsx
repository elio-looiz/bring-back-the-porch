"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Episodes", href: "/episodes" },
    { label: "Hosts", href: "/hosts" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href: string) =>
    `block px-3 py-2 rounded-lg transition-colors ${
      pathname === href
        ? "text-porch-green-light"
        : "text-porch-creamy hover:text-porch-green-light"
    }`;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-porch-black/80 backdrop-blur-sm p-4 shadow-lg"
    >
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                fill
                sizes="90%"
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="hidden sm:inline text-2xl font-extrabold text-porch-green-light hover:text-porch-creamy transition-colors">
              Bring Back The Porch
            </span>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <motion.ul
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex gap-6 text-lg"
        >
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={linkClass(href)}>
                {label}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-porch-creamy hover:text-porch-green-light focus:outline-none focus:ring-2 focus:ring-porch-green-light"
        >
          {/* Icon */}
          <svg
            className={`h-7 w-7 transition-transform ${
              open ? "rotate-90" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-screen w-4/5 max-w-xs bg-porch-black/95 backdrop-blur-md shadow-xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-porch-green-light">
                  Menu
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-porch-creamy hover:text-porch-green-light focus:outline-none focus:ring-2 focus:ring-porch-green-light"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <ul className="mt-6 space-y-2">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={linkClass(href)}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Optional: social / cta */}
              {/* <div className="mt-8 border-t border-white/10 pt-6">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center w-full rounded-xl bg-porch-green-light/10 text-porch-green-light px-4 py-3 font-semibold hover:bg-porch-green-light/20 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Subscribe
                </Link>
              </div> */}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
