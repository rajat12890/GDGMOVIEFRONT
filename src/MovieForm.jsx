import React, { useState } from "react";
import { createMovie } from "./Api";

const MovieForm = ({ fetchMovies }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [release, setRelease] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenre(genre.toLowerCase());
    const token = localStorage.getItem("token");
    await createMovie({ title, genre, rating, release }, token);
    fetchMovies();
  };

  return (
    <div className="w-screen ">
      <form onSubmit={handleSubmit} className="pt-10 flex flex-col px-10  ">
        <input
          type="text"
          className="    bg-[#374151] my-2 p-2 rounded-lg "
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          className="bg-[#374151] my-2 p-2 rounded-lg  "
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          className="bg-[#374151] my-2 p-2 rounded-lg "
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="date"
          placeholder="Release Date"
          className="bg-[#374151] my-2 p-2 rounded-lg "
          onChange={(e) => setRelease(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-transparent hover:text-blue-500 hover:font-bold"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
