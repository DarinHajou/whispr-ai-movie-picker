export async function fetchMovieMeta(title, year) {
  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  const fallback = {
    posterUrl: "/poster-placeholder.jpg",
    imdbId: null,
    tmdbId: null,
    summary: "",
    canonicalTitle: title,
    canonicalYear: year,
  };

  if (!accessToken) {
    console.error("Missing VITE_TMDB_ACCESS_TOKEN.");
    return fallback;
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const normalizeTitle = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  try {
    const searchParams = new URLSearchParams({
      query: title,
      include_adult: "false",
      language: "en-US",
    });

    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?${searchParams}`,
      { headers }
    );

    if (!searchResponse.ok) {
      throw new Error(`TMDB search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const results = searchData?.results ?? [];

    const requestedTitle = normalizeTitle(title);
    const requestedYear = String(year || "");

    const exactTitleMatches = results.filter(
      (movie) =>
        normalizeTitle(movie.title) === requestedTitle ||
        normalizeTitle(movie.original_title) === requestedTitle
    );

    const match =
      exactTitleMatches.find(
        (movie) =>
          movie.release_date?.slice(0, 4) === requestedYear
      ) ||
      exactTitleMatches[0];

    if (!match) {
      console.warn(`No exact TMDB match found for "${title}" (${year}).`);
      return fallback;
    }

    const detailsParams = new URLSearchParams({
      language: "en-US",
      append_to_response: "external_ids",
    });

    const detailsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${match.id}?${detailsParams}`,
      { headers }
    );

    if (!detailsResponse.ok) {
      throw new Error(
        `TMDB details failed: ${detailsResponse.status}`
      );
    }

    const details = await detailsResponse.json();

    return {
      posterUrl: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "/poster-placeholder.jpg",

      imdbId: details.external_ids?.imdb_id || null,
      tmdbId: details.id,

      // TMDB now supplies the factual plot summary.
      summary: details.overview || "",

      // TMDB supplies the verified title and release year.
      canonicalTitle: details.title || title,
      canonicalYear:
        details.release_date?.slice(0, 4) || year,
    };
  } catch (error) {
    console.error("Failed to fetch movie metadata:", error);
    return fallback;
  }
}