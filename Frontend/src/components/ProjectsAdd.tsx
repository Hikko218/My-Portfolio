"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/UploadImage";

export default function ProjectsAdd({
  onProjectAdded,
}: {
  onProjectAdded?: () => void;
}) {
  // State for project form fields
  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
    link: "",
  });
  // State for success message
  const [success, setSuccess] = useState(false);
  // State for image upload modal
  const [showImageUpload, setShowImageUpload] = useState(false);

  // Handles input changes for all fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({
        title: "",
        category: "",
        image: "",
        description: "",
        link: "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      if (onProjectAdded) onProjectAdded();
    }
  };

  // Handles image upload and updates form state
  const handleImageUpload = (imageUrl: string) => {
    setForm({ ...form, image: imageUrl });
    setShowImageUpload(false);
  };

  return (
    <motion.form
      className="bg-zinc-900/70 p-6 rounded-lg space-y-6"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title input */}
      <label htmlFor="title" className="  text-cyan-500">
        Title
      </label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      {/* Category input */}
      <label htmlFor="category" className="  text-cyan-500">
        Category
      </label>
      <input
        id="category"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      {/* Description input */}
      <label htmlFor="description" className="  text-cyan-500">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        placeholder="Description"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      {/* Link input */}
      <label htmlFor="link" className="  text-cyan-500">
        Link
      </label>
      <input
        id="link"
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="link"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      {/* Add image button */}
      <button
        type="button"
        onClick={() => setShowImageUpload(true)}
        className="bg-cyan-500 px-4 hover:bg-cyan-600 py-2 rounded w-full text-white"
      >
        Add Image
      </button>
      {/* Image upload modal */}
      {showImageUpload && (
        <ImageUpload
          uploadUrl={`${process.env.NEXT_PUBLIC_API_URL}/uploads`}
          method="POST"
          onUpload={handleImageUpload}
        />
      )}
      {/* Add project button */}
      <button
        type="submit"
        className="bg-cyan-500 px-4 hover:bg-cyan-600 py-2 rounded text-white"
      >
        Add Project
      </button>
      {/* Success message */}
      {success && <div className="text-green-400 pt-2">Project added!</div>}
    </motion.form>
  );
}
