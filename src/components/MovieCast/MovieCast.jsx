import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCast } from "../../services/api";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!cast.length) return <p>No cast info</p>;

  return (
    <ul className={styles.list}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.castItem}>
          <p>{actor.name}</p>
          <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w92${actor.profile_path}` : "/default-profile.jpg"} alt={actor.name} />
        </li>
      ))}
    </ul>
  );
}