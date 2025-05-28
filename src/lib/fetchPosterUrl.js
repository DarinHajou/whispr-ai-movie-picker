export async function fetchMovieMeta(title, year) {
  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const encodedTitle = encodeURIComponent(title);
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}${year ? `&year=${year}` : ""}`;

  try {
    const res = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const results = data?.results ?? [];

    const match = results.find((movie) => {
      const releaseYear = movie.release_date?.slice(0, 4);
      return (
        releaseYear === year ||
        movie.title.toLowerCase() === title.toLowerCase()
      );
    }) || results[0];

    if (!match) return { posterUrl: "/poster-placeholder.jpg", imdbId: null };

    const posterUrl = match.poster_path
      ? `https://image.tmdb.org/t/p/w500${match.poster_path}`
      : "/poster-placeholder.jpg";

    // Now fetch IMDb ID
    const externalUrl = `https://api.themoviedb.org/3/movie/${match.id}/external_ids`;
    const extRes = await fetch(externalUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const extData = await extRes.json();
    const imdbId = extData.imdb_id || null;

    return { posterUrl, imdbId };
  } catch (err) {
    console.error("Failed to fetch movie meta:", err);
    return { posterUrl: "/poster-placeholder.jpg", imdbId: null };
  }
}