"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import ImageUpload from "@/components/UploadImage";

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

export default function EditableAbout() {
  // State for loading status of skills and about data
  const [loadingSk, setLoadingSk] = useState(true);
  const [loadingAb, setLoadingAb] = useState(true);
  // State for about and skills data
  const [about, setAbout] = useState<About[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  // State for success messages
  const [successAbUp, setSuccessAbUp] = useState(false);
  const [successSkAdd, setSuccessSkAdd] = useState(false);
  const [successSkUpId, setSuccessSkUp] = useState<number | null>(null);
  const [successSkDelId, setSuccessSkDel] = useState<number | null>(null);
  // State for image upload modal
  const [showImageUpload, setShowImageUpload] = useState(false);

  // State for skill form
  const [skillsForm, setSkillsForm] = useState({
    skill: "",
    level: 0,
  });

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
  if (loadingAb || !about) {
    return <div className="text-center py-24">Loading…</div>;
  }
  if (loadingSk) return <div className="text-center py-24">Loading…</div>;

  // Updates about entry
  const updateAbout = async (id: number, about: Partial<About>) => {
    await fetch(`${apiUrl}/about/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    });
    setSuccessAbUp(true);
    setTimeout(() => setSuccessAbUp(false), 2000);
    const res = await fetch(`${apiUrl}/about`);
    const data = await res.json();
    setAbout(data);
  };

  // Updates a skill entry
  const updateSkill = async (id: number, updatedSkill: Skills) => {
    await fetch(`${apiUrl}/skills/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSkill),
    });
    setSuccessSkUp(id);
    const res = await fetch(`${apiUrl}/skills`);
    const data = await res.json();
    setSkills(data);
    setTimeout(() => {
      setSuccessSkUp(null);
    }, 1000);
  };

  // Adds a new skill
  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${apiUrl}/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skillsForm),
    });
    setSuccessSkAdd(true);
    setTimeout(async () => {
      const res = await fetch(`${apiUrl}/skills`);
      const data = await res.json();
      setSkills(data);
      setSuccessSkAdd(false);
    }, 1000);
    setSkillsForm({ skill: "", level: 0 });
  };

  // Deletes a skill by ID
  const removeSkill = async (id: number) => {
    await fetch(`${apiUrl}/skills/${id}`, {
      method: "DELETE",
    });
    setSuccessSkDel(id);
    setTimeout(async () => {
      const res = await fetch(`${apiUrl}/skills`);
      const data = await res.json();
      setSkills(data);
      setSuccessSkDel(null);
    }, 1000);
  };

  // Handles changes for about fields
  const handleChangeAbout = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedAbout = [...about];
    updatedAbout[index] = {
      ...updatedAbout[index],
      [e.target.name]: e.target.value,
    };
    setAbout(updatedAbout);
  };

  // Handles changes for skill fields
  const handleChangeSkills = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [e.target.name]: e.target.value,
    };
    setSkills(updatedSkills);
  };

  // Handles changes for skill form
  const handleChangeSkillsForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkillsForm((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  // Handles image upload for about entry
  const handleImageUpload = (i: number, imageUrl: string) => {
    const updatedAbout = [...about];
    updatedAbout[i] = {
      ...updatedAbout[i],
      image: imageUrl,
    };
    setAbout(updatedAbout);
  };

  return (
    <motion.div
      className="bg-zinc-900/70 p-6 rounded-lg space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* About section edit form */}
      {about.map((about, i) => (
        <div key={i} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Name input */}
            <div>
              <label htmlFor="name" className="  text-cyan-500">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={about.name}
                onChange={(e) => handleChangeAbout(e, i)}
                className="w-full p-3 rounded  bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Name"
              />
            </div>
            {/* Phone input */}
            <div>
              <label htmlFor="phone" className="  text-cyan-500">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={about.phone}
                onChange={(e) => handleChangeAbout(e, i)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Phone"
              />
            </div>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="  text-cyan-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={about.email}
                onChange={(e) => handleChangeAbout(e, i)}
                className="w-full p-3 rounded  bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Email"
              />
            </div>
          </div>
          {/* Description textarea */}
          <textarea
            name="description"
            value={about.description || ""}
            onChange={(e) => handleChangeAbout(e, i)}
            rows={4}
            className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            placeholder="Description"
          />
          {/* Change image button */}
          <button
            type="button"
            onClick={() => setShowImageUpload(true)}
            className="w-full p-2 bg-cyan-500  hover:bg-cyan-600  rounded text-white text-lg"
          >
            Change Image
          </button>
          {/* Image upload modal */}
          {showImageUpload && (
            <ImageUpload
              uploadUrl={`${apiUrl}${about.image}`}
              method="PUT"
              onUpload={(imageUrl) => handleImageUpload(i, imageUrl)}
            />
          )}
          {/* Update about button */}
          <button
            type="button"
            onClick={() => {
              updateAbout(about.id, about);
            }}
            className="p-2 w-30 bg-cyan-500 hover:bg-cyan-600 rounded  text-white text-lg"
          >
            Update
          </button>
        </div>
      ))}
      {/* Success message for about update */}
      {successAbUp && <div className=" text-green-400 pt-2">Updated!</div>}
      <div>
        <h3 className="font-semibold text-cyan-500 mb-2">Skills</h3>
        <div className="space-y-3">
          {/* Skills list */}
          {skills.map((skill, i) => (
            <div key={i} className="space-x-4">
              {/* Skill name input */}
              <input
                name="skill"
                value={skill.skill || ""}
                onChange={(e) => handleChangeSkills(e, i)}
                className="p-2 rounded w-1/3 bg-zinc-700 text-white  focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Skill name"
              />
              {/* Skill level input */}
              <input
                name="level"
                value={skill.level ?? 0}
                min={0}
                max={100}
                onChange={(e) => handleChangeSkills(e, i)}
                className="p-2 rounded bg-zinc-700 text-white w-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="%"
              />
              {/* Edit skill button */}
              <button
                type="button"
                onClick={() => updateSkill(skill.id, skill)}
                className="text-yellow-400 hover:text-yellow-600 font-bold text-lg"
                title="Edit Skill"
              >
                <Pencil size={16} />
              </button>
              {/* Remove skill button */}
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-red-400 hover:text-red-600 font-bold text-lg"
                title="Remove Skill"
              >
                ×
              </button>
              {/* Success message for skill update */}
              {successSkUpId === skill.id && (
                <div className=" text-green-400 pt-2">Updated!</div>
              )}
              {/* Success message for skill removal */}
              {successSkDelId === skill.id && (
                <div className=" text-red-400 pt-2">Removed!</div>
              )}
            </div>
          ))}
        </div>
        <div className="mb-2">
          {/* Add skill form */}
          <form className="" onSubmit={addSkill}>
            <div className="mt-18 space-x-4">
              {/* Skill name input */}
              <input
                name="skill"
                value={skillsForm.skill}
                onChange={handleChangeSkillsForm}
                placeholder="Skill"
                className="w-1/3 p-2  bg-zinc-700 rounded  focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Skill level input */}
              <input
                name="level"
                type="number"
                value={skillsForm.level}
                onChange={handleChangeSkillsForm}
                placeholder="Level"
                className="p-2 w-20 bg-zinc-700 rounded  focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            {/* Add skill button */}
            <button
              type="submit"
              className="p-2 mt-4 w-30 bg-cyan-500 hover:bg-cyan-700 text-white text-lg rounded"
            >
              + Add Skill
            </button>
            {/* Success message for skill addition */}
            {successSkAdd && (
              <div className=" text-green-400 pt-2">Skill added!</div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
