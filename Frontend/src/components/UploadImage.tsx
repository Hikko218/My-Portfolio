import { useState } from "react";

interface ImageUploadProps {
  projectId?: number; // Wenn gesetzt: PUT, sonst POST
  onUpload?: (imageUrl: string) => void;
}

export default function ImageUpload({ projectId, onUpload }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const method = projectId ? "PUT" : "POST";
    const url = projectId
      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${projectId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/uploads`;

    const res = await fetch(url, {
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
        onChange={e => setFile(e.target.files?.[0] || null)}
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