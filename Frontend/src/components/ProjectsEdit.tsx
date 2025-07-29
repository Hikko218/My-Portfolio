"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ImageUpload from "@/components/UploadImage";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string
}

interface ProjectsEditProps {
  projects: Project[];
  reloadProjects: () => Promise<void>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ProjectsEdit({
  projects,
  reloadProjects,
}: ProjectsEditProps) {
  // State for success messages
  const [successIdUp, setSuccessIdUp] = useState<number | null>(null);
  const [successIdDel, setSuccessIdDel] = useState<number | null>(null);
  // State for image upload modal
  const [imageUploadIndex, setImageUploadIndex] = useState<number | null>(null);
  // State for Projects
  const [editableProjects, setEditableProjects] = useState<Project[]>([]);

  useEffect(() => {
    setEditableProjects(projects);
  }, [projects]);

  // Handles changes for project fields
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedProjects = [...editableProjects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [e.target.name]: e.target.value,
    };
    setEditableProjects(updatedProjects);
  };

  // Updates a project entry
  const updateProject = async (id: number, updatedProject: Project) => {
    await fetch(`${apiUrl}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    });
    reloadProjects();
    setSuccessIdUp(id);
    setTimeout(() => setSuccessIdUp(null), 2000);
  };

  // Removes a project entry and its image
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
      reloadProjects();
      setSuccessIdDel(null);
    }, 2000);
  };

  return (
    <div className=" space-y-6 bg-zinc-900/70 rounded-lg ">
      {/* Edit Project form with callback to reload projects after editing */}
      <AnimatePresence>
        {editableProjects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-zinc-900/70 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6 flex flex-col gap-4">
              {/* Project title input */}
              <label htmlFor="title" className="  text-cyan-500">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={project.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Project category input */}
              <label htmlFor="category" className="  text-cyan-500">
                Category
              </label>
              <input
                id="category"
                name="category"
                value={project.category}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Project description input */}
              <label htmlFor="description" className="  text-cyan-500">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                rows={4}
                className="p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Project link input */}
              <label htmlFor="link" className="  text-cyan-500">
                Link
              </label>
              <input
                id="link"
                name="link"
                value={project.link}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Edit image button */}
              <button
                type="button"
                onClick={() => setImageUploadIndex(index)}
                className="bg-cyan-500 px-4 hover:bg-cyan-600 py-2 rounded w-full text-white"
              >
                Edit Image
              </button>
              {/* Image upload modal */}
              {imageUploadIndex === index && (
                <ImageUpload
                  uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}//${project.image}`}
                  method="PUT"
                  onUpload={(imageUrl) => {
                    const updatedProject = { ...project, image: imageUrl };
                    updateProject(project.id, updatedProject);
                    setImageUploadIndex(null);
                  }}
                />
              )}
              <div className=" grid-cols-2 space-x-4">
                {/* Update project button */}
                <button
                  type="button"
                  onClick={() =>
                    updateProject(project.id, editableProjects[index])
                  }
                  className="p-2 rounded bg-cyan-500 text-white hover:bg-cyan-600  text-lg"
                  title="Update Project"
                >
                  Update Project
                </button>
                {/* Remove project button */}
                <button
                  type="button"
                  onClick={() => removeProject(project.id, project.image)}
                  className="p-2 rounded bg-red-500 text-white hover:bg-red-600  text-lg"
                  title="Remove Project"
                >
                  Delete Project
                </button>
                {/* Success message for project update */}
                {successIdUp === project.id && (
                  <div className=" text-green-400 pt-2">Project updated!</div>
                )}
                {/* Success message for project removal */}
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
