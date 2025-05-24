import { useEffect, useState } from "react";
import { fetchPosterUrl } from "../lib/fetchPosterUrl";

export default function MovieResultCard({ title, explanation }) {
  const [poster, setPoster] = useState("/poster-placeholder.jpg");

  useEffect(() => {
    const cleanTitle = title.replace(/["(].*$/, "").trim(); 
    const yearMatch = explanation.match(/\((\d{4})\)/);
    const year = yearMatch?.[1] ?? "";
    console.log("Title:", title, "Year:", year);
  
    fetchPosterUrl(cleanTitle, year).then((url) => {
      console.log("Poster URL fetched:", url);
      setPoster(url);
    });
  }, [title, explanation]);
  
  return (
    <div className="flex bg-gray-800 rounded shadow p-4 space-x-4">
      <img
        src={poster}
        alt={title}
        className="w-24 h-auto rounded"
      />
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-gray-300 text-sm mt-1">{explanation}</p>
      </div>
    </div>
  );
}
