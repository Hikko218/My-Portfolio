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
const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

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

  return (
    <section
      id="about"
      className="min-h-screen py-24 bg-black/60 backdrop-blur-s text-white px-6 md:px-20"
    >
      {/* Show loading indicator while data is being fetched */}
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2  items-center">
        {loadingAb || loadingSk ? (
          <div className="text-center py-24 w-full col-span-2">Loading…</div>
        ) : (
          <>
            {/* Image and skills section */}
            <motion.div
              key="about-motion-image"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Profile image */}
              <Image
                src={`${imageURL}/uploads/${about[0].image}`}
                alt="Profil_Image"
                width={500}
                height={400}
                className="rounded-2xl shadow-md  object-cover w-full h-auto  aspect-[5/4]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 50%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 50%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* About text section */}
            <motion.div
              key="about-motion-text"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className=" md:ml-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-cyan-500">
                About Me
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {about[0].description.split(",,").map((part, idx) => (
                  <span key={idx}>
                    {part}
                    {idx < about[0].description.split(",,").length - 1 && (
                      <br />
                    )}
                  </span>
                ))}
              </p>

              <div className="space-y-1 text-sm text-gray-400">
                <p>
                  <strong className="text-cyan-500">Name:</strong>{" "}
                  {about[0].name}
                </p>
                <p>
                  <strong className="text-cyan-500">Phone:</strong> +
                  {about[0].phone}
                </p>
                <p>
                  <strong className="text-cyan-500">Email:</strong>{" "}
                  {about[0].email}
                </p>
              </div>
            </motion.div>

            {/* Skills list */}
            <div className="space-y-4 mt-16">
              <h3 className="text-3xl font-bold mb-6 text-cyan-500">Skills</h3>
              {skills.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex justify-between space-y-1 text-sm font-medium text-gray-200">
                    <span>{skill.skill}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      key="about-motion-skill-bar"
                      className="bg-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
