import axios from 'axios';
import API_KEY from './apiKey';
import { BASE_URL, IMAGE_BASE_URL } from './apiVariables';
import posterSizes from '../data/posterSizes';
import getImageSize from '../utils/imageSizes';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};

const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(`/trending/all/day?`);
    const { results } = await data;
    return results;
  } catch (error) {
    throw error;
  }
};

const fetchMoviesByQuery = async (query, page = 1) => {
  try {
    const { data } = await axios.get(`/search/movie`, {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    const { results } = await data;
    return results;
  } catch (error) {
    throw error;
  }
};

const fetchMovieDetails = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`, {
      params: { append_to_response: 'credits,reviews' },
    });

    const {
      genres,
      id,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      vote_average,
      credits,
      reviews,
    } = await data;
    const results = {
      genres,
      id,
      overview,
      popularity,
      posterPath: `${IMAGE_BASE_URL}${getImageSize(posterSizes)}${poster_path}`,
      releaseDate: release_date,
      title,
      voteAverage: vote_average,
      cast: credits.cast,
      reviews: reviews.results,
    };
    return results;
  } catch (error) {
    throw error;
  }
};

export { fetchTrendingMovies, fetchMoviesByQuery, fetchMovieDetails };
