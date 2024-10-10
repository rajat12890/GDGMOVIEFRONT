import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie, updateMovie, filter } from "./Api";
import MovieForm from "./MovieForm";

const MovieList = ({ fetchMovies, movies, setMovies }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [release, setRelease] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [show, setshow] = useState(false);
  const [Id, setId] = useState("");

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteMovie(id, token);
    fetchMovies();
  };
  const handleupdate = async (id) => {
    console.log({ title, genre, rating, release });
    console.log(id);

    const token = localStorage.getItem("token");
    await updateMovie(id, { title, genre, rating, release }, token);
    setshow(!show);
    fetchMovies();
  };
  const set = async (id) => {
    setId(id);
    console.log(Id);
    if (Id != "") {
      setshow(!show);
    }
    console.log(Id);
  };
  const handleFilter = async (genre, year,title) => {
    try {
      const response = await filter(title,genre, year.toString());
      console.log(response);

      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching filtered movies:", error);
      setMovies([]);
    }
  };
  useEffect(() => {
    fetchMovies();
    console.log(movies);
  }, []);

  return (
    <div>
      <h2 className="text-center text-xl font-bold py-5">Movies</h2>
      <div className="flex justify-between mb-4 px-16">
        <input
          type="text"
          placeholder="Filter by Genre"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Filter by Release Date"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border p-2"
        />
         <input
          type="text"
          placeholder="Filter by Title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={() => handleFilter(filterGenre, filterYear,filterTitle)}
          className="bg-yellow-500 text-white p-2  px-10 hover:bg-transparent hover:text-yellow-500 hover:font-bold hover:border-yellow-500"
        >
          Filter
        </button>
      </div>
      <section class=" px-16 mx-auto mt-10 text-white">
        <div class="flex flex-col">
          <div class="  sm:-mx-6 lg:-mx-8">
            <div class=" min-w-full py-2  md:px-6 lg:px-8">
              <div class=" border border-gray-200  ">
                <table class="min-w-full  ">
                  <div>
                    <div className="flex justify-between pr-64 text-md  text-center">
                      <h1 className="pr-16 pl-5  text-center">Title</h1>
                      <h1 className="pr-32 pl-8 text-center">Date</h1>
                      <h1 className="pr-48 text-center ">Genre</h1>
                      <h1 className="pr-48  text-center">Rating</h1>
                    </div>
                  </div>
                  <tbody class="bg-white  ">
                    {movies.map((movie) => (
                      <div className="flex justify-between">
                        <div className="px-4 py-4  text-sm font-medium text-gray-700  whitespace-nowrap ">
                          {movie.title}
                        </div>
                        <div class="px- py-4 text-sm text-gray-900 :text-gray-300 whitespace-nowrap  pr-5">
                          {movie.release.substring(0, 10)}
                        </div>

                        <div class="px- py-4 text-sm text-gray-900 :text-gray-300 whitespace-nowrap  pr-5">
                          <div class="flex items-center ">
                            <div>
                              <h2 class="text-sm font-medium text-gray-800 :text-white ">
                                {movie.genre}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div class="px- py-4 text-sm text-gray-900 :text-gray-300 whitespace-nowrap  pr-5">
                          <div class="flex items-center ">
                            <div>
                              <h2 class="text-sm font-medium text-gray-800 :text-white flex justify-center items-center">
                                {movie.rating}
                              </h2>
                            </div>
                          </div>
                        </div>

                        <div class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex items-center ">
                            <button
                              className="bg-red-500 hover:text-red-500 hover:font-bold hover:bg-transparent hover:border-red-500"
                              onClick={() => handleDelete(movie._id)}
                            >
                              Delete
                            </button>

                            <button
                              className="bg-green-500 hover:text-green-500 hover:font-bold hover:bg-transparent hover:border-green-500 px-5 ml-2"
                              onClick={async () => await set(movie._id)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {show ? (
        <div className=" ">
          <form
            onSubmit={() => handleupdate(Id)}
            className="pt-10 flex flex-col px-10  "
          >
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
              Update Movie
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default MovieList;
