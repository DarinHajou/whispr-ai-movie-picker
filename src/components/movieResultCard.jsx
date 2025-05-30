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
    <div className="relative flex bg-gray-800/80 rounded-xl shadow-lg p-4 gap-4 sm:gap-5 items-start">
      {/* Poster */}
      <img
        src={poster}
        alt={`${title} poster`}
        className="w-20 sm:w-24 rounded-md object-cover"
      />

      {/* IMDb badge */}
      <div className="absolute top-2 right-2 flex items-center bg-black/70 px-2 py-1 rounded-md text-yellow-400 text-xs font-semibold gap-1">
        <img
          src="/images/imdb_logo.png"
          alt="IMDb"
          className="w-5 h-4 object-contain"
        />
        <span>{imdb}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-2 text-left max-w-[calc(100%-6rem)]">
        {imdbId ? (
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg sm:text-xl font-semibold text-warm-white hover:underline leading-snug"
          >
            {title} ({year})
          </a>
        ) : (
          <h3 className="text-lg sm:text-xl font-semibold text-warm-white leading-snug">
            {title} ({year})
          </h3>
        )}

        <p className="text-xs sm:text-sm text-mist-blue leading-tight">
          <span className="font-medium">Tone:</span> {tone}
        </p>
        <p className="text-xs sm:text-sm text-gray-300 leading-snug">{plot}</p>
      </div>
    </div>
  );
}
