import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import Container from '../components/Container';
import Button from '../components/Button';
import Error from '../components/Error';
import { fetchTrendingMovies } from '../services/moviesApi';

let source;

const HomePage = () => {
  const [movies, setmovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getTrendingMovies = () => {
      source = axios.CancelToken.source();
      setIsLoading(true);

      fetchTrendingMovies(currentPage, source)
        .then(trendingMovies => {
          setmovies(prevMovies => [...prevMovies, ...trendingMovies]);
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    };
    getTrendingMovies();
    return () => {
      if (source) {
        source.cancel('Please, reload previous page');
      }
    };
  }, [currentPage]);

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const shouldRenderLoadMoreBtn = movies.length > 0 && !isLoading;

  return (
    <Container>
      {error ? (
        <Error />
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Trending today</h1>
          <MovieList movies={movies} />
          {shouldRenderLoadMoreBtn && <Button onClick={updatePage} />}
        </>
      )}
    </Container>
  );
};

export default HomePage;
