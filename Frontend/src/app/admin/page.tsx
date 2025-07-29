"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin() {
  const router = useRouter();
  // State for login form fields
  const [form, setForm] = useState({ username: "", password: "" });
  // State for error message
  const [error, setError] = useState<string | null>(null);
  // State for logged in
  const { setIsLoggedIn } = useAuth();
  // State for success message
  const [success, setSuccess] = useState(false);

  // Handles input changes for both fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handles form for login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setIsLoggedIn(true);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
      setTimeout(() => setError(null), 2000);
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
        {/* Success message */}
        {success && <div className="text-green-400 pt-2">Login successful!</div>}

        {/* Error message */}
        {error && <div className="text-red-400 text-center">{error}</div>}

        {/* Submit button */}
        <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-700">
          Login
        </Button>
      </motion.form>
    </main>
  );
}
