"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Background positions for each route
const bgPositions: Record<string, string> = {
  "/": "40% center",
  "/about": "55% center",
  "/portfolio": "70% center",
  "/blog": "85% center",
  "/contact": "right center",
};

// Wrapper sets dynamic background image and position based on route
export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Detect mobile for background size
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);
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
