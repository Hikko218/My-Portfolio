"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const allProjects = [
  { title: "Modern Website", image: "/file.svg", category: "Web" },
  { title: "Mobile App UI", image: "/file.svg", category: "App" },
  { title: "Brand Identity", image: "/file.svg", category: "Design" },
  { title: "Landing Page", image: "/file.svg", category: "Web" },
  { title: "iOS Concept", image: "/file.svg", category: "App" },
];

const categories = ["All", "Web", "App", "Design"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="min-h-screen py-24 bg-black/60 backdrop-blur-sm px-6 md:px-20 text-white"
    >
      <motion.div
        key="projects-motion-title"
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-500">My Portfolio</h2>
        <p className="text-gray-300">Some of my recent works</p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === cat
                ? "bg-cyan-500 border-cyan-500 text-white"
                : "border-gray-600  hover:bg-cyan-500"
            } transition duration-300`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-zinc-800/70 backdrop-blur-xl rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl text-cyan-500 font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-gray-300">{project.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
