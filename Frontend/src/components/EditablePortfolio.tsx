"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function EditablePortfolio() {
  const [form, setForm] = useState({ title: "", category: "", image: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", category: "", image: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <motion.form
      className="bg-zinc-900/70 p-6 rounded-lg space-y-6"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="p-2 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        type="submit"
        className="bg-cyan-500 px-4 hover:bg-cyan-600 py-2 rounded text-white"
      >
        Add Project
      </button>
      {success && <div className="text-green-400 pt-2">Project added!</div>}
    </motion.form>
  );
}
