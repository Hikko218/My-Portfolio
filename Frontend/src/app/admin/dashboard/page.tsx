"use client";

import { useState, useEffect } from "react";
import PortfolioAdd from "@/components/ProjectsAdd";
import EditableAbout from "@/components/AboutEdit";
import ProjectsEdit from "@/components/ProjectsEdit";
import BlogAdd from "@/components/BlogAdd";
import BlogEdit from "@/components/BlogEdit";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  // State for projects
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Loads projects from API
  const reloadProjects = async () => {
    const res = await fetch(`${apiUrl}/projects`);
    const data = await res.json();
    setProjects(data);
  };

  // Loads blogs from API
  const reloadBlogs = async () => {
    const res = await fetch(`${apiUrl}/blog`);
    const data = await res.json();
    setBlogs(data);
  };

  // Initial load
  useEffect(() => {
    reloadProjects();
    reloadBlogs();
  }, []);
  return (
    <main className="min-h-screen px-6 md:px-20 py-24 bg-black/60 text-white">
      {/* Admin Navbar */}
      <nav className="flex justify-center gap-4 mb-8">
        <button
          onClick={() =>
            document
              .getElementById("add-projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
        >
          Add Projects
        </button>
        <button
          onClick={() =>
            document
              .getElementById("edit-projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
        >
          Edit Projects
        </button>
        <button
          onClick={() =>
            document
              .getElementById("edit-about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600  text-white font-semibold"
        >
          Edit About
        </button>
        <button
          onClick={() =>
            document
              .getElementById("add-blogs")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600  text-white font-semibold"
        >
          Add Blogs
        </button>
        <button
          onClick={() =>
            document
              .getElementById("edit-blogs")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600  text-white font-semibold"
        >
          Edit Blog
        </button>
      </nav>
      {/* Dashboard title */}
      <h1 className="text-3xl text-cyan-500 font-bold mb-10">
        Admin Dashboard
      </h1>
      {/* Section for adding new blog posts */}
      <section id="add-blogs" className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">Add Blogs</h2>
        <BlogAdd onBlogAdded={reloadBlogs} />
      </section>

      {/* Section for adding new projects */}
      <section id="add-projects" className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">
          Add Projects
        </h2>
        <PortfolioAdd onProjectAdded={reloadProjects} />
      </section>

      {/* Section for editing existing blogs */}
      <section id="edit-blogs" className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">
          Edit Blog Section
        </h2>
        <BlogEdit blogs={blogs} reloadBlogs={reloadBlogs} />
      </section>

      {/* Section for editing existing projects */}
      <section id="edit-projects" className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">
          Edit Projects Section
        </h2>
        <ProjectsEdit projects={projects} reloadProjects={reloadProjects} />
      </section>

      {/* Section for editing about information */}
      <section id="edit-about" className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">
          Edit About Section
        </h2>
        <EditableAbout />
      </section>
    </main>
  );
}
