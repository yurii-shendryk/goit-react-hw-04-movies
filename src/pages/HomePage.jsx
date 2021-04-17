import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import Container from '../components/Container';
import { fetchTrendingMovies } from '../services/moviesApi';
const HomePage = () => {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () =>
    fetchTrendingMovies()
      .then(trendingMovies => setmovies(trendingMovies))
      .catch(error => console.log(error));

  return (
    <Container>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </Container>
  );
};

export default HomePage;
