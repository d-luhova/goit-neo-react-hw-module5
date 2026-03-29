import { useEffect, useState } from "react";
import { fetchTrending } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getTrending = async () => {
      setLoading(true);
      try {
        const data = await fetchTrending();
        if (isMounted) setMovies(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    getTrending();
    return () => (isMounted = false);
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}