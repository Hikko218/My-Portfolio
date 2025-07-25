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
  const [loadingSk, setLoadingSk] = useState(true);
  const [loadingAb, setLoadingAb] = useState(true);
  const [about, setAbout] = useState<About[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [successAbUp, setSuccessAbUp] = useState(false);
  const [successSkAdd, setSuccessSkAdd] = useState(false);
  const [successSkUpId, setSuccessSkUp] = useState<number | null>(null);
  const [successSkDelId, setSuccessSkDel] = useState<number | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const [skillsForm, setSkillsForm] = useState({
    skill: "",
    level: 0,
  });

  useEffect(() => {
    fetch(`${apiUrl}/about`)
      .then((res) => res.json())
      .then((data) => {
        setAbout(data);
        setLoadingAb(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoadingSk(false);
      });
  }, []);

  if (loadingAb || !about) {
    return <div className="text-center py-24">Loading…</div>;
  }
  if (loadingSk) return <div className="text-center py-24">Loading…</div>;

  const updateAbout = async (id: number, about: About) => {
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

  // Handler für Skills
  const updateSkill = async (id: number, updatedSkill: Skills) => {
    await fetch(`${apiUrl}/skills/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSkill),
    });
    setSuccessSkUp(id)
    const res = await fetch(`${apiUrl}/skills`);
    const data = await res.json();
    setSkills(data);
    setTimeout(() => {
      setSuccessSkUp(null);
    }, 1000);
  };

  // Skill hinzufügen
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

  // Skill löschen
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

  // Handler für einfache Felder
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

  const handleChangeSkillsForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkillsForm((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

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
      {about.map((about, i) => (
        <div key={i} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <input
              name="name"
              value={about.name}
              onChange={(e) => handleChangeAbout(e, i)}
              className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Name"
            />
            <input
              name="phone"
              value={about.phone}
              onChange={(e) => handleChangeAbout(e, i)}
              className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Phone"
            />
            <input
              name="email"
              value={about.email}
              onChange={(e) => handleChangeAbout(e, i)}
              className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Email"
            />
          </div>
          <textarea
            name="description"
            value={about.description || ""}
            onChange={(e) => handleChangeAbout(e, i)}
            rows={4}
            className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            placeholder="Description"
          />
          <button
            type="button"
            onClick={() => setShowImageUpload(true)}
            className="w-full p-2 bg-cyan-500  hover:bg-cyan-600  rounded text-white text-lg"
          >
            Change Image
          </button>
          {showImageUpload && (
            <ImageUpload
              uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${about.image}`}
              method="PUT"
              onUpload={(imageUrl) => handleImageUpload(i, imageUrl)}
            />
          )}
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
      {successAbUp && <div className=" text-green-400 pt-2">Updated!</div>}
      <div>
        <h3 className="font-semibold text-cyan-500 mb-2">Skills</h3>
        <div className="space-y-3  ">
          {skills.map((skill, i) => (
            <div key={i} className="  space-x-4">
              <input
                name="skill"
                value={skill.skill || ""}
                onChange={(e) => handleChangeSkills(e, i)}
                className="p-2 rounded w-1/3 bg-zinc-700 text-white  focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Skill name"
              />
              <input
                name="level"
                value={skill.level ?? 0}
                min={0}
                max={100}
                onChange={(e) => handleChangeSkills(e, i)}
                className="p-2 rounded bg-zinc-700 text-white w-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="%"
              />

              <button
                type="button"
                onClick={() => updateSkill(skill.id, skill)}
                className="text-yellow-400 hover:text-yellow-600 font-bold text-lg"
                title="Edit Skill"
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-red-400 hover:text-red-600 font-bold text-lg"
                title="Remove Skill"
              >
                ×
              </button>
              {successSkUpId === skill.id && (
                <div className=" text-green-400 pt-2">Updated!</div>
              )}

              {successSkDelId === skill.id &&  (
                <div className=" text-red-400 pt-2">Removed!</div>
              )}
            </div>
          ))}
        </div>
        <div className="mb-2">
          <form className="" onSubmit={addSkill}>
            <div className=" mt-18 space-x-4">
              <input
                name="skill"
                value={skillsForm.skill}
                onChange={handleChangeSkillsForm}
                placeholder="Skill"
                className="w-1/3 p-2  bg-zinc-700 rounded  focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                name="level"
                type="number"
                value={skillsForm.level}
                onChange={handleChangeSkillsForm}
                placeholder="Level"
                className="p-2 w-20 bg-zinc-700 rounded  focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="p-2 mt-4 w-30 bg-cyan-500 hover:bg-cyan-700 text-white text-lg rounded"
            >
              + Add Skill
            </button>
            {successSkAdd && (
              <div className=" text-green-400 pt-2">Skill added!</div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
