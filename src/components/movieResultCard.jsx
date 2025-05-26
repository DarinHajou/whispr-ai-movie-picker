import { useEffect, useState } from "react";
import { fetchPosterUrl } from "../lib/fetchPosterUrl";

export default function MovieResultCard({ title, year, tone, imdb, plot }) {
  const [poster, setPoster] = useState("/poster-placeholder.jpg");

  useEffect(() => {
    const cleanTitle = title.replace(/["(].*$/, "").trim();
    fetchPosterUrl(cleanTitle, year).then((url) => {
      setPoster(url);
    });
  }, [title, year]);

  return (
    <div className="relative flex bg-gray-800 rounded shadow p-4 space-x-4">
      {/* Poster */}
      <img
        src={poster}
        alt={`${title} poster`}
        className="w-24 h-auto rounded"
      />

      {/* IMDb top-right */}
      <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/70 px-2 py-1 rounded text-yellow-400 text-xs font-medium">
        <img
          src="/images/imdb_logo.png"
          alt="IMDb"
          className="w-6 h-auto"
        />
        <span>{imdb}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-1 text-left">
        <h3 className="text-lg font-bold text-warm-white">
          {title} ({year})
        </h3>
        <p className="text-sm text-mist-blue">
          <span className="font-medium">Tone:</span> {tone}
        </p>
        <p className="text-sm text-gray-300 mt-1">{plot}</p>
      </div>
    </div>
  );
}
