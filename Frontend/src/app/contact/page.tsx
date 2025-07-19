"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/ui/button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Später hier API call an Nest.js-Backend
    console.log("Form submitted:", form);
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-24 px-6 md:px-20 bg-black/60 backdrop-blur-sm text-white"
    >
      <motion.div
        key="contact-motion-title"
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-500">
          Contact Me
        </h2>
        <p className="text-gray-400">Got a project in mind? Let’s talk.</p>
      </motion.div>

      <motion.form
        key="contact-motion-form"
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 p-4 rounded-md bg-zinc-800/70 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="flex-1 p-4 rounded-md  bg-zinc-800/70 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <textarea
          name="message"
          rows={8}
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-4 rounded-md bg-zinc-800/70 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          required
        />

        <Button
          type="submit"
          className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-700"
        >
          Send Message
        </Button>
      </motion.form>
    </section>
  );
}
