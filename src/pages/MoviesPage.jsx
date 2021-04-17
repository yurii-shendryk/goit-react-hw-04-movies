import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList';
import { fetchMoviesByQuery } from '../services/moviesApi';
const MoviesPage = () => {
  const { push } = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(queryParams?.query || '');

  useEffect(() => {
    if (searchQuery) {
      push({
        ...location,
        search: `?query=${searchQuery}`,
      });
      getMoviesByQuery();
    }
    // eslint-disable-next-line
  }, [searchQuery]);

  const getMoviesByQuery = () =>
    fetchMoviesByQuery(searchQuery).then(moviesByQuery =>
      setMovies(prev => [...prev, ...moviesByQuery]),
    );

  const onChangeQuery = query => {
    setSearchQuery(query);
    if (query !== searchQuery) {
      setMovies([]);
    }
  };

  return (
    <>
      <SearchForm onSubmit={onChangeQuery} />
      <MovieList movies={movies} query={searchQuery} />
    </>
  );
};

export default MoviesPage;
