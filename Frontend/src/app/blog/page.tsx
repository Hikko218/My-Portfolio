"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Blog {
  title: string;
  description: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  link: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function Blog() {
  // State for blog data
  const [blog, setBlog] = useState<Blog[]>([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  // Calculate indices for current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blog.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blog.length / postsPerPage);

  // Fetch blog data on mount
  useEffect(() => {
    fetch(`${apiUrl}/blog`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="blog"
      className="min-h-screen py-24 bg-black/60 backdrop-blur-s px-6 md:px-20 text-white"
    >
      {/* Show loading indicator while data is being fetched */}
      {loading ? (
        <div className="text-center py-24">Loading…</div>
      ) : (
        <>
          {/* Blog section title */}
          <motion.div
            key="projects-motion-title"
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-500">
              My Blog
            </h2>
            <p className="text-gray-300">
              Insights, updates, and things I’m currently working on.
            </p>
          </motion.div>

          <div className=" max-w-xl mx-auto">
            {/* Render current blog posts */}
            {currentPosts.map((blog, index) => (
              <motion.div
                key={index}
                className="bg-zinc-800/30 backdrop-blur-s mt-8 rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Blog image */}
                <Image
                  src={`${imageURL}/uploads/${blog.image}`}
                  alt={blog.title}
                  width={600}
                  height={400}
                  className="w-full aspect-[16/9] object-cover"
                />
                {/* Blog details */}
                <div className="p-5">
                  <h3 className="text-xl text-cyan-500 font-semibold mb-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-300 whitespace-pre-line">
                    {blog.description}
                  </p>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-600 "
                  >
                    {blog.link}
                  </a>
                  <p className="text-sm mt-4 text-gray-300">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
            {/* Pagination controls */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 rounded bg-cyan-500 text-white disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-1 text-gray-300">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 rounded bg-cyan-500 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
