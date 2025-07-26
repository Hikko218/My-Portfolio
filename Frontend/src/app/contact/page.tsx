"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/ui/button";

export default function Contact() {
  // State for contact form fields
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // State for success message
  const [success, setSuccess] = useState(false);
  // State for error message
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-24 px-6 md:px-20 bg-black/60 backdrop-blur-s text-white"
    >
      {/* Contact section title */}
      <motion.div
        key="contact-motion-title"
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-500">
          Contact Me
        </h2>
        <p className="text-gray-400">Any questions? Let’s talk.</p>
      </motion.div>

      {/* Contact form */}
      <motion.form
        key="contact-motion-form"
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Name input */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 p-4 rounded-md bg-zinc-800/30 backdrop-blur-s text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="flex-1 p-4 rounded-md  bg-zinc-800/30 backdrop-blur-s text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        {/* Message textarea */}
        <textarea
          name="message"
          rows={8}
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-4 rounded-md bg-zinc-800/30 backdrop-blur-s text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          required
        />

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-700"
        >
          Send Message
        </Button>

        {/* Success message */}
        {success && <div className="text-green-400 pt-2">Message sent!</div>}
        {/* Error message */}
        {error && <div className="text-red-400 pt-2">{error}</div>}
      </motion.form>
    </section>
  );
}
