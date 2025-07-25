"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  // State for login form fields
  const [form, setForm] = useState({ username: "", password: "" });
  // State for error message
  const [error, setError] = useState<string | null>(null);

  // Handles input changes for both fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary login check (replace with JWT authentication later)
    if (form.username === "admin" && form.password === "secret") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black/60 text-white px-6">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-zinc-900/70 p-8 rounded-lg w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl text-cyan-500 font-bold text-center">
          Admin Login
        </h1>

        {/* Username input */}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {/* Password input */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Error message */}
        {error && (
          <div className="text-red-400 text-center">{error}</div>
        )}

        {/* Submit button */}
        <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-700">
          Login
        </Button>
      </motion.form>
    </main>
  );
}
