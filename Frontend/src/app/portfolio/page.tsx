"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
}

const categories = ["All", "Web", "App", "Design"];

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function Projects() {
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState("All");
  // State for projects data
  const [projects, setProjects] = useState<Project[]>([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // Filter projects by selected category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Fetch projects data on mount
  useEffect(() => {
    fetch(`${apiUrl}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen py-24 bg-black/60 backdrop-blur-s px-6 md:px-20 text-white"
    >
      {/* Show loading indicator while data is being fetched */}
      {loading ? (
        <div className="text-center py-24">Loading…</div>
      ) : (
        <>
          {/* Portfolio section title */}
          <motion.div
            key="projects-motion-title"
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-500">
              My Portfolio
            </h2>
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

          {/* Projects grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-zinc-800/30 backdrop-blur-s rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Project image */}
                  <Image
                    src={`${imageURL}/uploads${project.image}`}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  {/* Project details */}
                  <div className="p-5">
                    <h3 className="text-xl text-cyan-500 font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300">{project.category}</p>
                    <p className="text-sm text-gray-300">
                      {project.description.split(",,").map((part, idx) => (
                        <span key={idx}>
                          {part}
                          {idx < project.description.split(",,").length - 1 && (
                            <br />
                          )}
                        </span>
                      ))}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-600 "
                    >
                      {project.link}
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}
