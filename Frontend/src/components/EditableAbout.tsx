"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function EditableAbout() {
  // Beispiel-Initialdaten
  const [about, setAbout] = useState({
    name: "Edrae Kennedy",
    phone: "+1903 6598 123",
    email: "hello@example.com",
    twitter: "@designguru9",
    description:
      "Hi! My name is Edrae Kennedy. I am a graphic designer, and I’m very passionate and dedicated to my work. With 10 years experience as a professional graphic designer, I have acquired the skills and knowledge necessary to make your project a success. I enjoy every step of the design process, from discussion and collaboration to concept and execution.",
    skills: [
      { name: "Photoshop", level: 100 },
      { name: "Illustrator", level: 85 },
    ],
  });

  // Handler für einfache Felder
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  // Handler für Skills
  const updateSkill = (idx: number, field: "name" | "level", value: string | number) => {
    const newSkills = about.skills.map((skill, i) =>
      i === idx ? { ...skill, [field]: field === "level" ? Number(value) : value } : skill
    );
    setAbout({ ...about, skills: newSkills });
  };

  // Skill hinzufügen
  const addSkill = () => {
    setAbout({ ...about, skills: [...about.skills, { name: "", level: 0 }] });
  };

  // Skill löschen
  const removeSkill = (idx: number) => {
    setAbout({ ...about, skills: about.skills.filter((_, i) => i !== idx) });
  };

  return (
    <motion.div 
    className="bg-zinc-900/70 p-6 rounded-lg space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          value={about.name}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Name"
        />
        <input
          name="phone"
          value={about.phone}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Phone"
        />
        <input
          name="email"
          value={about.email}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Email"
        />
        <input
          name="twitter"
          value={about.twitter}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Twitter"
        />
      </div>

      <textarea
        name="description"
        value={about.description}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        placeholder="Description"
      />

      <div>
        <h3 className="font-semibold text-cyan-500 mb-2">Skills</h3>
        <div className="space-y-3">
          {about.skills.map((skill, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                value={skill.name}
                onChange={e => updateSkill(i, "name", e.target.value)}
                className="p-2 rounded bg-zinc-700 text-white flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Skill name"
              />
              <input
                type="number"
                value={skill.level}
                min={0}
                max={100}
                onChange={e => updateSkill(i, "level", e.target.value)}
                className="p-2 rounded bg-zinc-700 text-white w-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="%"
              />
              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="text-red-400 hover:text-red-600 font-bold text-lg"
                title="Remove Skill"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 mt-2 bg-cyan-500 hover:bg-cyan-700 text-white rounded"
          >
            + Add Skill
          </button>
        </div>
      </div>
    </motion.div>
  );
}
