import { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../services/apiKey';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [seachQuery, setSearchQuery] = useState('');
  const [films, setFilms] = useState([]);
  useEffect(() => {
    if (seachQuery) {
      fetchFilms();
    }
  }, [seachQuery]);

  const fetchFilms = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    );
    const { results } = await data;
    setFilms(prev => [...prev, ...results]);
  };

  const handleChange = e => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchQuery(query);
    if (query !== seachQuery) {
      setFilms([]);
    }
  };
  return (
    <>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          onChange={handleChange}
        />
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
      <ul>
        {films.map(film => (
          <li key={film.id}>{film.title || film.name}</li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPage;
