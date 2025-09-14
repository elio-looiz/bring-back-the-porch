"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  HeartHandshake,
  UsersRound,
  Newspaper,
  Mail,
  Send,
} from "lucide-react";
import { useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

// --- Animation Variants ---
// This is a more reliable way to handle animations on page load.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Animate children one after another
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};
// --- End of Animation Variants ---

function ContactForm() {
  const [status, setStatus] = useState("Submit");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!executeRecaptcha) {
      console.error("Recaptcha not available");
      setStatus("Recaptcha Error");
      return;
    }

    const recaptchaToken = await executeRecaptcha("contactFormSubmit");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, recaptchaToken }),
      });

      if (res.ok) {
        setStatus("Message Sent!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setTimeout(() => setStatus("Submit"), 3000);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed. Try again.");
      setTimeout(() => setStatus("Submit"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-porch-green-light"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-porch-green-light"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-porch-green-light"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-porch-green-light"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          disabled={status !== "Submit"}
          className="w-full flex items-center justify-center gap-2 bg-porch-green-light text-porch-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
          {status}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA Site Key is not set in .env.local. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables."
    );
    return (
      <div className="bg-porch-black text-porch-creamy min-h-screen flex items-center justify-center">
        <p>
          Error: The contact form is not configured correctly. Missing reCAPTCHA
          site key.
        </p>
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <motion.section
        className="relative bg-porch-black text-porch-creamy overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-porch-green-light">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Have a story idea, a question, or just want to say hello? We’d
              love to hear from you.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 relative min-h-[300px] md:min-h-full">
                <Image
                  src="/contact-photo.jpg" // Replace with your photo
                  alt="A vintage microphone on a wooden porch"
                  fill
                  priority={false}
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              <div className="md:col-span-3 p-8 md:p-10">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Mail className="h-8 w-8 text-porch-green-light" />
                  Send us a Message
                </h2>
                <p className="text-gray-400 mb-6">
                  We'll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 my-24 md:my-32"
            // We can apply variants to a group of items as well
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // Using whileInView here for the group is fine
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={itemVariants}
              className="border border-white/10 bg-white/5 p-8 rounded-2xl text-center"
            >
              <div className="flex justify-center mb-4">
                <HeartHandshake className="h-10 w-10 text-porch-green-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">GIVE</h3>
              <p className="text-gray-300 mb-4">
                Support our actions around the community.
              </p>
              <a
                href="/donate"
                className="font-bold text-porch-green-light hover:underline"
              >
                Donate
              </a>
            </motion.div>

            {/* <motion.div
              variants={itemVariants}
              className="border border-white/10 bg-white/5 p-8 rounded-2xl text-center"
            >
              <div className="flex justify-center mb-4">
                <UsersRound className="h-10 w-10 text-porch-green-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">JOIN US</h3>
              <p className="text-gray-300 mb-4">
                Discover work opportunities with our team.
              </p>
              <a
                href="/careers"
                className="font-bold text-porch-green-light hover:underline"
              >
                Join us
              </a>
            </motion.div> */}

            <motion.div
              variants={itemVariants}
              className="border border-white/10 bg-white/5 p-8 rounded-2xl text-center"
            >
              <div className="flex justify-center mb-4">
                <Newspaper className="h-10 w-10 text-porch-green-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">FIND OUT MORE</h3>
              <p className="text-gray-300 mb-4">
                Follow the daily work of our teams in the field.
              </p>
              <a
                href="/blog"
                className="font-bold text-porch-green-light hover:underline"
              >
                Read our Blog
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Our Community Hub</h2>
              <p className="mt-2 text-gray-400">
                Proudly based in Medicine Hat, Alberta.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81734.28200080352!2d-110.74543994345517!3d50.02636603950153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53132d3e0c09193b%3A0x502354352719a80!2sMedicine%20Hat%2C%20AB!5e0!3m2!1sen!2sca!4v1668278780922!5m2!1sen!2sca"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </GoogleReCaptchaProvider>
  );
}
