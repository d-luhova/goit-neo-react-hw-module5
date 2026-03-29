import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDcwNGY2ZjE0NTBlNWY5Y2I5NGVkMzVhNjI5ODkwYSIsIm5iZiI6MTc3NDczNjE2Ni44NDgsInN1YiI6IjY5Yzg1MzI2NTViOGMyYTZiNGZiZDBlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q_xHODXZQgdgD0b_ujOYIQ72naF4vZNmZosqGiSaWeg";    

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const options = () => ({
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchTrending = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day";
  const res = await axios.get(url, options());
  return res.data.results;
};

export const searchMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const res = await axios.get(url, options());
  return res.data.results;
};

export const fetchMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const res = await axios.get(url, options());
  return res.data;
};

export const fetchCast = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
  const res = await axios.get(url, options());
  return res.data.cast;
};

export const fetchReviews = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
  const res = await axios.get(url, options());
  return res.data.results;
};