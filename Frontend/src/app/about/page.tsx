"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const skills = [
  { name: "Photoshop", level: 100 },
  { name: "Illustrator", level: 85 },
  { name: "Next.js", level: 85 },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-black/60 backdrop-blur-sm text-white px-6 md:px-20"
    >
      <div className="relative min-h-screen max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div key="about-motion">
          <motion.div
            key="about-motion-image"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Image
              src="/Profil_Foto_1.png"
              alt="Profil_Image"
              width={500}
              height={400}
              className="rounded-2xl shadow-md  object-cover w-full h-auto  aspect-[5/4]"
            />
            <div className="absolute inset-0 bg-primary/40 rounded-2xl pointer-events-none" />
          </motion.div>
          {/* Skills */}
          <div className="mt-8 space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1 text-sm font-medium text-gray-200">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    key="about-motion-skill-bar"
                    className="bg-cyan-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          key="about-motion-text"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-0 md:mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-cyan-500">About Me</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Hi! My name is Edrae Kennedy. I am a graphic designer, and I’m very
            passionate and dedicated to my work. With 10 years experience as a
            professional graphic designer, I have acquired the skills and
            knowledge necessary to make your project a success. I enjoy every
            step of the design process, from discussion and collaboration to
            concept and execution.
          </p>

          <div className="space-y-1 text-sm text-gray-400">
            <p>
              <strong className="text-cyan-500">Name:</strong> Edrae Kennedy
            </p>
            <p>
              <strong className="text-cyan-500">Phone:</strong> +1903 6598 123
            </p>
            <p>
              <strong className="text-cyan-500">Email:</strong>{" "}
              hello@example.com
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
