"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ImageUpload from "@/components/UploadImage";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  link: string
}

interface BlogEditProps {
  blogs: Blog[];
  reloadBlogs: () => Promise<void>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BlogEdit({ blogs, reloadBlogs }: BlogEditProps) {
  // State for success messages
  const [successIdUp, setSuccessIdUp] = useState<number | null>(null);
  const [successIdDel, setSuccessIdDel] = useState<number | null>(null);
  // State for image upload modal
  const [imageUploadIndex, setImageUploadIndex] = useState<number | null>(null);
  // State for Blogs
  const [editableBlogs, setEditableBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setEditableBlogs(blogs);
  }, [blogs]);

  // Handles changes for blog fields
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedBlogs = [...editableBlogs];
    updatedBlogs[index] = {
      ...updatedBlogs[index],
      [e.target.name]: e.target.value,
    };
    setEditableBlogs(updatedBlogs);
  };

  // Updates a project entry
  const updateBlog = async (id: number, updatedBlogs: Partial<Blog>) => {
    await fetch(`${apiUrl}/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlogs),
    });
    reloadBlogs();
    setSuccessIdUp(id);
    setTimeout(() => setSuccessIdUp(null), 2000);
  };

  // Removes a project entry and its image
  const removeBlog = async (id: number, imageUrl?: string) => {
    if (imageUrl) {
      const filename = imageUrl.split("/").pop();
      await fetch(`${apiUrl}/uploads/${filename}`, {
        method: "DELETE",
      });
    }
    await fetch(`${apiUrl}/blog/${id}`, {
      method: "DELETE",
    });
    setSuccessIdDel(id);
    setTimeout(async () => {
      reloadBlogs();
      setSuccessIdDel(null);
    }, 2000);
  };

  return (
    <div className=" space-y-6 bg-zinc-900/70 rounded-lg ">
      {/* Edit Blog form with callback to reload blogs after editing */}
      <AnimatePresence>
        {editableBlogs.map((blog, index) => (
          <motion.div
            key={index}
            className="bg-zinc-900/70 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6 flex flex-col gap-4">
              {/* Blog title input */}
              <label htmlFor="title" className="  text-cyan-500">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={blog.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Blog description input */}
              <label htmlFor="description" className="  text-cyan-500">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={blog.description}
                onChange={(e) => handleChange(index, e)}
                rows={4}
                className="p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Blog link input */}
              <label htmlFor="link" className="  text-cyan-500">
                Link
              </label>
              <input
                id="link"
                name="link"
                value={blog.link}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Edit image button */}
              <button
                type="button"
                onClick={() => setImageUploadIndex(index)}
                className="bg-cyan-500 px-4 hover:bg-cyan-600 py-2 rounded w-full text-white"
              >
                Edit Image
              </button>
              {/* Image upload modal */}
              {imageUploadIndex === index && (
                <ImageUpload
                  uploadUrl={`${apiUrl}/uploads/${blog.image}`}
                  method="PUT"
                  onUpload={(imageUrl) => {
                    const updatedBlog = { ...blog, image: imageUrl };
                    updateBlog(blog.id, updatedBlog);
                    setImageUploadIndex(null);
                  }}
                />
              )}
              <div className=" grid-cols-2 space-x-4">
                {/* Update blog button */}
                <button
                  type="button"
                  onClick={() => updateBlog(blog.id, editableBlogs[index])}
                  className="p-2 rounded bg-cyan-500 text-white hover:bg-cyan-600  text-lg"
                  title="Update Project"
                >
                  Update Blog
                </button>
                {/* Remove blog button */}
                <button
                  type="button"
                  onClick={() => removeBlog(blog.id, blog.image)}
                  className="p-2 rounded bg-red-500 text-white hover:bg-red-600  text-lg"
                  title="Remove Project"
                >
                  Delete Blog
                </button>
                {/* Success message for project update */}
                {successIdUp === blog.id && (
                  <div className=" text-green-400 pt-2">Blog updated!</div>
                )}
                {/* Success message for project removal */}
                {successIdDel === blog.id && (
                  <div className=" text-red-400 pt-2">Blog removed!</div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
