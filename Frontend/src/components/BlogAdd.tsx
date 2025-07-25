"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/UploadImage";

export default function BlogAdd({ onBlogAdded }: { onBlogAdded?: () => void }) {
  // State for project form fields
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });
  // State for success message
  const [success, setSuccess] = useState(false);
  // State for image upload modal
  const [showImageUpload, setShowImageUpload] = useState(false);

  // Handles input changes for all fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", image: "", description: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      if (onBlogAdded) onBlogAdded();
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
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      {/* Description input */}
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
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
        Add Blog
      </button>
      {/* Success message */}
      {success && <div className="text-green-400 pt-2">Blog added!</div>}
    </motion.form>
  );
}
