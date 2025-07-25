import { useState } from "react";

interface ImageUploadProps {
  uploadUrl: string; // Ziel-URL für den Upload
  method: string; // HTTP-Methode, optional
  onUpload?: (imageUrl: string) => void;
}

export default function ImageUpload({
  uploadUrl,
  method,
  onUpload,
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(uploadUrl, {
      method,
      body: formData,
    });
    const data = await res.json();
    if (onUpload) onUpload(data.url);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
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
