import React, { useEffect, useState } from "react";
import { fetchChapters } from "../utils/fetchChapters";

export default function ChaptersList() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchChapters().then(setChapters);
  }, []);

  return (
    <div>
      <h1>EMT Chapters</h1>
      <ul>
        {chapters.map((chap, idx) => (
          <li key={idx}>
            <strong>{chap.title}</strong> {/* Adjust for actual structure */}
          </li>
        ))}
      </ul>
    </div>
  );
}