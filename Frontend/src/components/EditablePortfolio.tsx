"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function EditablePortfolio() {
  const [projects, setProjects] = useState([
    { title: "Modern Website", category: "Web" },
    { title: "App UI", category: "App" },
  ]);

  const updateProject = (index: number, field: string, value: string) => {
    const updated = [...projects];
    updated[index][field as "title" | "category"] = value;
    setProjects(updated);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {projects.map((proj, i) => (
        <div key={i} className="bg-zinc-900/70 p-4 rounded space-y-2">
          <input
            value={proj.title}
            onChange={(e) => updateProject(i, "title", e.target.value)}
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            value={proj.category}
            onChange={(e) => updateProject(i, "category", e.target.value)}
            className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      ))}
    </motion.div>
  );
}
