import { useState } from "react";

interface ImageUploadProps {
  uploadUrl: string; // Target URL for the upload
  method: string; // HTTP method
  onUpload?: (imageUrl: string) => void;
}

export default function ImageUpload({
  uploadUrl,
  method,
  onUpload,
}: ImageUploadProps) {
  // State for selected file
  const [file, setFile] = useState<File | null>(null);

  // Handles image upload
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(uploadUrl, {
      method,
      body: formData,
    });
    const data = await res.json();
    // Calls callback with uploaded image URL
    if (onUpload) onUpload(data.url);
  };

  return (
    <div>
      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      {/* Upload button */}
      <button
        type="button"
        onClick={handleUpload}
        className="p-2 rounded bg-cyan-500 text-white hover:bg-cyan-600"
      >
        Upload Image
      </button>
    </div>
  );
}
