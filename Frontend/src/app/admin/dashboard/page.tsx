"use client";

import EditablePortfolio from "@/components/EditablePortfolio";
import EditableAbout from "@/components/EditableAbout";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen px-6 md:px-20 py-24 bg-black/60 text-white">
      <h1 className="text-3xl text-cyan-500 font-bold mb-10">Admin Dashboard</h1>

      <section className="mb-16">
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">Edit Portfolio</h2>
        <EditablePortfolio />
      </section>

      <section>
        <h2 className="text-2xl text-cyan-500 font-semibold mb-4">Edit About Section</h2>
        <EditableAbout />
      </section>
    </main>
  );
}
