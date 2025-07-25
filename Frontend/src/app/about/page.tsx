"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Skills {
  id: number;
  skill: string;
  level: string;
}

interface About {
  id: number;
  description: string;
  name: string;
  phone: string;
  email: string;
  image: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function About() {
  // State for loading status of skills and about data
  const [loadingSk, setLoadingSk] = useState(true);
  const [loadingAb, setLoadingAb] = useState(true);
  // State for about and skills data
  const [about, setAbout] = useState<About[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);

  // Fetch about data on mount
  useEffect(() => {
    fetch(`${apiUrl}/about`)
      .then((res) => res.json())
      .then((data) => {
        setAbout(data);
        setLoadingAb(false);
      });
  }, []);

  // Fetch skills data on mount
  useEffect(() => {
    fetch(`${apiUrl}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoadingSk(false);
      });
  }, []);

  // Show loading indicator while data is being fetched
  if (loadingAb) return <div className="text-center py-24">Loading…</div>;
  if (loadingSk) return <div className="text-center py-24">Loading…</div>;

  return (
    <section
      id="about"
      className="py-24 bg-black/60 backdrop-blur-sm text-white px-6 md:px-20"
    >
      <div className="relative min-h-screen max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image and skills section */}
        <motion.div key="about-motion">
          <motion.div
            key="about-motion-image"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Profile image */}
            <Image
              src={`${apiUrl}/uploads/${about[0].image}`}
              alt="Profil_Image"
              width={500}
              height={400}
              className="rounded-2xl shadow-md  object-cover w-full h-auto  aspect-[5/4]"
            />
            <div className="absolute inset-0 bg-primary/40 rounded-2xl pointer-events-none" />
          </motion.div>
          {/* Skills list */}
          <div className="mt-8 space-y-4">
            {skills.map((skill) => (
              <div key={skill.skill}>
                <div className="flex justify-between mb-1 text-sm font-medium text-gray-200">
                  <span>{skill.skill}</span>
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

        {/* About text section */}
        <motion.div
          key="about-motion-text"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-0 md:mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-cyan-500">About Me</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            {about[0].description}
          </p>

          <div className="space-y-1 text-sm text-gray-400">
            <p>
              <strong className="text-cyan-500">Name:</strong> {about[0].name}
            </p>
            <p>
              <strong className="text-cyan-500">Phone:</strong> +{about[0].phone}
            </p>
            <p>
              <strong className="text-cyan-500">Email:</strong> {about[0].email}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
