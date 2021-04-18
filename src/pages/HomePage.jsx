import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import Container from '../components/Container';
import Error from '../components/Error';
import { fetchTrendingMovies } from '../services/moviesApi';
const HomePage = () => {
  const [movies, setmovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () =>
    fetchTrendingMovies()
      .then(trendingMovies => setmovies(trendingMovies))
      .catch(error => setError(error));

  return (
    <Container>
      {error ? (
        <Error />
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Trending today</h1>
          <MovieList movies={movies} />
        </>
      )}
    </Container>
  );
};

export default HomePage;
