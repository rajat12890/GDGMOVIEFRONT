import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const registerUser = async (userData) => {
  return await api.post("/users/register", userData);
};

export const loginUser = async (userData) => {
  return await api.post("/users/login", userData);
};

export const createMovie = async (movieData, token) => {
  return await api.post("/movies", movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMovies = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export const filter = async (title,genre, year) => {
  const response = await api.get("/movies/filter", {
    params: { title,genre, year },
  });
  return response;
};
export const updateMovie = async (id, movieData, token) => {
  return await api.put(`/movies/${id}`, movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMovie = async (id, token) => {
  return await api.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
