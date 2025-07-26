import { useEffect, useState } from "react";
import { fetchMovieMeta } from "../lib/fetchPosterUrl";

export default function MovieResultCard({ title, year, tone, imdb, plot }) {
  const [poster, setPoster] = useState("/poster-placeholder.jpg");
  const [imdbId, setImdbId] = useState(null);
  const [tmdbId, setTmdbId] = useState(null);
  const [providers, setProviders] = useState([]);
  
const solCommentaryByTone = {
  reflective: "This one hits hard if you’re feeling distant.",
  uplifting: "A gentle boost when you're low on energy.",
  thrilling: "Buckle up — this will mess with your head in the best way.",
  romantic: "Soft, tender, and just the right kind of ache.",
  dark: "Lean into the shadows — it's worth it.",
  heartwarming: "Let yourself feel something again.",
  intimate: "For when you're in the mood to feel something real.",
  nostalgic: "This one taps into something personal and warm.",
  whimsical: "Playful and imaginative — let yourself wander.",
  witty: "Sharp and clever — with a dose of charm.",
  subdued: "Quiet, soft, and emotionally resonant.",
  contemplative: "This one lingers after it ends.",
};

  const matchedComment = Object.entries(solCommentaryByTone).find(([key]) =>
    tone?.toLowerCase().includes(key.toLowerCase())
  )?.[1];

  useEffect(() => {
    const cleanTitle = title.replace(/["(].*$/, "").trim();
    fetchMovieMeta(cleanTitle, year).then(({ posterUrl, imdbId, tmdbId }) => {
      setPoster(posterUrl);
      setImdbId(imdbId);
      setTmdbId(tmdbId);
    });
  }, [title, year]);

  useEffect(() => {
    if (!tmdbId) return;
    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        let countryObj = data.results.NO || data.results.US || Object.values(data.results)[0];
        if (!countryObj) {
          setProviders([]);
          return;
        }
        const movieLink = countryObj.link;
        const flatrate = countryObj.flatrate || [];
        setProviders(flatrate.map(p => ({ ...p, movieLink })));
      });
  }, [tmdbId]);

  return (
    <div className="relative flex bg-gray-800/80 rounded-xl shadow-lg p-4 gap-4 sm:gap-5 items-start">
      <img
        src={poster}
        alt={`${title} poster`}
        className="w-20 sm:w-24 rounded-md object-cover"
      />

      <div className="absolute top-2 right-2 flex items-center bg-black/70 px-1 py-0.5 rounded-md text-yellow-400 text-xs font-semibold gap-1">
        <img
          src="/images/imdb_logo.png"
          alt="IMDb"
          className="w-5 h-4 object-contain"
        />
        <span>{imdb}</span>
      </div>

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

        {tone && (
          <p className="text-xs sm:text-sm text-mist-blue leading-tight">
            <span className="font-medium text-bright-amber">Tone:</span> {tone}
          </p>
        )}

        {matchedComment && (
          <p className="text-xs sm:text-sm italic text-[#FFC542] mt-1">
            💬 {matchedComment}
          </p>
        )}

        <p className="text-xs sm:text-sm text-gray-300 leading-snug">{plot}</p>

        {providers.length > 0 ? (
          <div className="flex flex-row gap-2 mt-2">
            {providers.map(provider => (
              <a
                key={provider.provider_id}
                href={provider.movieLink}
                target="_blank"
                rel="noopener noreferrer"
                title={provider.provider_name}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-8 h-8 rounded"
                />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-blue-300 mt-2">
            Not available for streaming.
          </p>
        )}
      </div>
    </div>
  );
}

