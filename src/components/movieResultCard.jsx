import { useEffect, useState } from "react";
import { fetchMovieMeta } from "../lib/fetchPosterUrl";

export default function MovieResultCard({ title, year, tone, imdb, plot }) {
  const [poster, setPoster] = useState("/poster-placeholder.jpg");
  const [imdbId, setImdbId] = useState(null);

  useEffect(() => {
    const cleanTitle = title.replace(/["(].*$/, "").trim();
    fetchMovieMeta(cleanTitle, year).then(({ posterUrl, imdbId }) => {
      setPoster(posterUrl);
      setImdbId(imdbId);
    });
  }, [title, year]);

  return (
    <div className="relative flex bg-gray-800 mt-12 rounded-lg shadow-sm p-2 sm:p-3 space-x-2">
      {/* Poster */}
      <img
        src={poster}
        alt={`${title} poster`}
        className="w-20 h-auto rounded"
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
      {imdbId ? (
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-warm-white hover:underline"
          >
            {title} ({year})
          </a>
        ) : (
          <h3 className="text-lg font-bold text-warm-white">
            {title} ({year})
          </h3>
        )}

        <p className="text-xs text-mist-blue">
          <span className="font-medium">Tone:</span> {tone}
        </p>
        <p className="text-xs text-gray-300 mt-1">{plot}</p>
      </div>
    </div>
  );
}
