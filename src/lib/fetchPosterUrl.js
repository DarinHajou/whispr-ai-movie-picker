export async function fetchPosterUrl(title, year) {
    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
    const encodedTitle = encodeURIComponent(title);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}${year ? `&year=${year}` : ""}`;
  
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      const posterPath = data?.results?.[0]?.poster_path;
  
      return posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : "/poster-placeholder.jpg";
    } catch (err) {
      console.error("TMDB fetch failed:", err);
      return "/poster-placeholder.jpg";
    }
  }  
  