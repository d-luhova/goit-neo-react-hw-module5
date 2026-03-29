import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../services/api";
import styles from "./MovieReviews.module.css"; 

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews(movieId);
        setReviews(data);
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
  if (!reviews.length) return <p>No reviews</p>;

  return (
    <ul>
      {reviews.map(r => (
        <li className={styles.review} key={r.id}>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}