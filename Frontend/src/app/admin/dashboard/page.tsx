"use client";

import { useState, useEffect } from "react";
import PortfolioAdd from "@/components/ProjectsAdd";
import EditableAbout from "@/components/AboutEdit";
import ProjectsUse from "@/components/ProjectsEdit";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  // State for projects
  const [projects, setProjects] = useState([]);

  // Loads projects from API
  const reloadProjects = async () => {
    const res = await fetch(`${apiUrl}/projects`);
    const data = await res.json();
    setProjects(data);
  };

  // Initial load
  useEffect(() => {
    reloadProjects();
  }, []);
  return (
    <main className="min-h-screen px-6 md:px-20 py-24 bg-black/60 text-white">
      {/* Dashboard title */}
      <h1 className="text-3xl text-cyan-500 font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* Section for adding new projects */}
      <section className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">
          Add Projects
        </h2>
        <PortfolioAdd onProjectAdded={reloadProjects} />;
      </section>

      {/* Section for editing existing projects */}
      <section className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">
          Edit Projects Section
        </h2>
        <ProjectsUse projects={projects} reloadProjects={reloadProjects} />
      </section>

      {/* Section for editing about information */}
      <section className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">
          Edit About Section
        </h2>
        <EditableAbout />
      </section>
    </main>
  );
}
