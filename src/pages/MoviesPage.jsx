import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList';
import Error from '../components/Error';
import Button from '../components/Button';
import Container from '../components/Container';
import { fetchMoviesByQuery } from '../services/moviesApi';
const MoviesPage = () => {
  const { push } = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(queryParams?.query || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    push({
      ...location,
      search: `?query=${searchQuery}`,
    });
    const getMoviesByQuery = () => {
      setIsLoading(true);
      fetchMoviesByQuery(searchQuery, currentPage)
        .then(moviesByQuery => {
          setMovies(prev => [...prev, ...moviesByQuery]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    };
    getMoviesByQuery();
  }, [searchQuery, currentPage]);

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const onChangeQuery = query => {
    setSearchQuery(query);
    if (query !== searchQuery) {
      setMovies([]);
    }
  };

  const shouldRenderLoadMoreBtn = movies.length > 0 && !isLoading;

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <Container>
          <SearchForm onSubmit={onChangeQuery} />
          <MovieList movies={movies} query={searchQuery} />
          {shouldRenderLoadMoreBtn && <Button onClick={updatePage} />}
        </Container>
      )}
    </>
  );
};

export default MoviesPage;
