"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PortfolioAdd from "./ProjectsAdd";
import ImageUpload from "@/components/UploadImage";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ProjectsEdit() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [successIdUp, setSuccessIdUp] = useState<number | null>(null);
  const [successIdDel, setSuccessIdDel] = useState<number | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  const updateProject = async (id: number, updatedProject: Project) => {
    await fetch(`${apiUrl}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    });

    const res = await fetch(`${apiUrl}/projects`);
    const data = await res.json();
    setProjects(data);
    setSuccessIdUp(id);
    setTimeout(() => setSuccessIdUp(null), 2000);
  };

  const removeProject = async (id: number, imageUrl?: string) => {
    if (imageUrl) {
      const filename = imageUrl.split("/").pop();
      await fetch(`${apiUrl}/uploads/${filename}`, {
        method: "DELETE",
      });
    }
    await fetch(`${apiUrl}/projects/${id}`, {
      method: "DELETE",
    });
    setSuccessIdDel(id);
    setTimeout(async () => {
      const res = await fetch(`${apiUrl}/projects`);
      const data = await res.json();
      setProjects(data);
      setSuccessIdDel(null);
    }, 2000);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [e.target.name]: e.target.value,
    };
    setProjects(updatedProjects);
  };

  const reloadProjects = async () => {
    const res = await fetch(`${apiUrl}/projects`);
    const data = await res.json();
    setProjects(data);
  };
  <PortfolioAdd onProjectAdded={reloadProjects} />;

  const handleImageUpload = (index: number, imageUrl: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      image: imageUrl,
    };
    setProjects(updatedProjects);
  };

  return (
    <div className=" space-y-6 bg-zinc-900/70 rounded-lg ">
      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-zinc-900/70 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6 flex flex-col gap-4">
              <input
                name="title"
                value={project.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                name="category"
                value={project.category}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                className="p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowImageUpload(true)}
                className="bg-cyan-500 px-4 hover:bg-cyan-600 py-2 rounded w-full text-white"
              >
                Edit Image
              </button>
              {showImageUpload && (
                <ImageUpload
                  uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}${project.image}`}
                  method="PUT"
                  onUpload={(imageUrl) => handleImageUpload(index, imageUrl)}
                />
              )}
              <div className=" grid-cols-2 space-x-4">
                <button
                  type="button"
                  onClick={() => updateProject(project.id, project)}
                  className="p-2 rounded bg-cyan-500 text-white hover:bg-cyan-600  text-lg"
                  title="Update Project"
                >
                  Update Project
                </button>
                <button
                  type="button"
                  onClick={() => removeProject(project.id, project.image)}
                  className="p-2 rounded bg-red-500 text-white hover:bg-red-600  text-lg"
                  title="Remove Project"
                >
                  Delete Project
                </button>
                {successIdUp === project.id && (
                  <div className=" text-green-400 pt-2">Project updated!</div>
                )}

                {successIdDel === project.id && (
                  <div className=" text-red-400 pt-2">Project removed!</div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
