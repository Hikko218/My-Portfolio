"use client";
import { usePathname } from "next/navigation";

const bgPositions: Record<string, string> = {
  "/": "40% center",
  "/about": "55% center",
  "/portfolio": "70% center",
  "/blog": "85% center",
  "/contact": "right center",
};

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

// Dynamically set backgroundSize for mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const backgroundSize = isMobile ? "cover" : "120% auto";

  return (
    <body
      className="min-h-screen flex flex-col bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: "url('/hero_bg_2.jpg')",
        backgroundPosition: bgPositions[pathname] || "center center",
        backgroundSize,
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </body>
  );
}
