"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import { ImLinkedin } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/components/AuthContext";
import { useLogout } from "@/components/AuthLogout";

// Navigation items for the header
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, checkAuth } = useAuth();
  const logout = useLogout();
  const router = useRouter();

  const handleDashboardClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const success = await checkAuth();
    if (success) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <header className="fixed top-0 left-0 h-16 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        {/* Left Section: Admin/Logout/LogIn/Dashboard */}
        <div className="hidden md:flex gap-4 w-[150px] justify-start">
          {isLoggedIn ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link
                  href="#"
                  onClick={logout}
                  className="text-red-400 hover:text-red-500 "
                >
                  Logout
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <button
                  type="button"
                  onClick={handleDashboardClick}
                  className="text-yellow-400 hover:text-yellow-500 bg-transparent border-none cursor-pointer"
                >
                  Dashboard
                </button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link
                  href="/admin"
                  className="text-green-400 hover:text-green-500 "
                >
                  LogIn
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Center Section: Desktop Navigation Links */}
        <nav className="flex-1 flex justify-center">
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-cyan-500 transition-colors duration-300 cursor-default"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right Section: Social Icons */}
        <div className="hidden md:flex space-x-4 text-gray-300 w-[150px] justify-end">
          <a
            href="https://www.linkedin.com/in/heiko-ries-b35778374"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-cyan-700 "
          >
            <ImLinkedin size={22} />
          </a>
          <a
            href="https://github.com/Hikko218"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-cyan-700 rounded-md"
          >
            <FaGithub size={22} />
          </a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <HiMenu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 flex flex-col items-center py-4 z-40">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-secondary/40 py-2 w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
