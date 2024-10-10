import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieForm from "./MovieForm";
import MovieList from "./MovieList";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import "./App.css";
import { getMovies } from "./Api";

const App = () => {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const response = await getMovies();
    setMovies(response.data);
  };
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <MovieForm fetchMovies={fetchMovies} />
              <MovieList
                fetchMovies={fetchMovies}
                movies={movies}
                setMovies={setMovies}
              />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
