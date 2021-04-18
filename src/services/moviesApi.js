import axios from 'axios';
import API_KEY from './apiKey';
import { BASE_URL, IMAGE_BASE_URL } from './apiVariables';
import posterSizes from '../data/posterSizes';
import getImageSize from '../utils/imageSizes';
const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
    );
    const { results } = await data;
    return results;
  } catch (error) {
    throw error;
  }
};

const fetchMoviesByQuery = async searchQuery => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
    );
    const { results } = await data;
    return results;
  } catch (error) {
    throw error;
  }
};

const fetchMovieDetails = async movieId => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,reviews`,
    );

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
