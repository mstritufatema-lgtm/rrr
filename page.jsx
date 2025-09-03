"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setVideo(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">FB Video Downloader</h1>
      
      <div className="w-full max-w-xl flex gap-2">
        <input
          type="text"
          placeholder="Paste Facebook video link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow p-3 rounded-xl text-black"
        />
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg"
        >
          {loading ? "Loading..." : "Download"}
        </button>
      </div>

      {video && (
        <div className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xl text-center">
          <img src={video.thumbnail} alt="thumbnail" className="rounded-lg mb-4" />
          <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
          <a
            href={video.downloadUrl}
            target="_blank"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl shadow-lg"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}
