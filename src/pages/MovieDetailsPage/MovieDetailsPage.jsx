import { useEffect, useState, useRef } from "react";
import { useParams, Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { fetchMovieDetails, IMAGE_BASE_URL } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMovieDetails(movieId);
        if (isMounted) setMovie(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getMovie();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  return (
    <>
      <Link className={styles.goBack} to={backLinkRef.current}>
        Go back
      </Link>
      
      <div className={styles.movieContainer}>
        <div className={styles.posterContainer}>
          {movie.poster_path && (
            <img className={styles.poster}
              src={IMAGE_BASE_URL + movie.poster_path}
              alt={movie.title}
              width="300"
        />
        )}
        </div>
       <div className={styles.details}>
        <h2>{movie.title}</h2>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Release Date</h3>
        <p>{movie.release_date}</p>
        <h3>Genres</h3>
        <p>{movie.genres.map(g => g.name).join(", ")}</p>
        </div>
    </div> 
      <nav className={styles.nav}>
        <NavLink 
          to="cast"
          className={styles.navLink}
        >
          Cast
        </NavLink>
        <NavLink className={styles.navLink}
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}