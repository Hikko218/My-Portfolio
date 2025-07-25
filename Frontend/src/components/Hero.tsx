"use client";

import { Button } from "@/ui/button";
import { motion } from "framer-motion";
import { ImLinkedin } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-32 "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center justify-center z-10 text-center max-w-3xl "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Social icons */}
        <div className="flex flex-row items-center justify-center gap-4 mb-6">
          <a
            href="https://www.linkedin.com/in/heiko-ries-b35778374"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-cyan-500"
          >
            <ImLinkedin size={22} />
          </a>
          <a
            href="https://github.com/Hikko218"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-cyan-500 rounded-md"
          >
            <FaGithub size={22} />
          </a>
        </div>
        {/* Hero title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-cyan-500">
          Hi, I&apos;m a Heiko Ries
        </h1>
        {/* Hero description */}
        <p className="text-lg text-gray-300 mb-8">
          I’m on my way to becoming a Full-Stack Developer. My passion lies in
          crafting elegant and efficient solutions that enhance user
          experiences. I thrive on challenges and am always eager to learn new
          technologies.
        </p>

        {/* Hero buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <Link href="/portfolio">
            <Button className="bg-cyan-500 hover:bg-cyan-700  text-gray-300">
              My Work
            </Button>
          </Link>
          <Link href="/about">
            <Button className="bg-cyan-500 hover:bg-cyan-700  text-gray-300">
              About-Me
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
