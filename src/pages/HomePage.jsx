import { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../services/apiKey';
const HomePage = () => {
  const [trendingFilms, setTrendingFilms] = useState([]);
  useEffect(() => {
    getTrendingFilms();
  }, []);

  const getTrendingFilms = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
    );
    const { results } = await data;
    setTrendingFilms(results);
    console.log(results);
  };

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trendingFilms.map(film => (
          <li key={film.id}>{film.title || film.name}</li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
