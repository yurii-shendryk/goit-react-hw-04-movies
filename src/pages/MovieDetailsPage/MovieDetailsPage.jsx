import { useEffect, useState } from 'react';
import routes from '../../routes';
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Container from '../../components/Container';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import { fetchMovieDetails } from '../../services/moviesApi';

import './MovieDetailsPage.scss';
const MovieDetailsPage = () => {
  const { url, path, params } = useRouteMatch();
  const { push } = useHistory();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState({
    genres: null,
    id: null,
    overview: null,
    popularity: null,
    posterPath: null,
    releaseDate: null,
    title: null,
    voteAverage: null,
    voteCount: null,
    cast: null,
    reviews: null,
  });

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line
  }, []);

  const getMovieDetails = () => {
    fetchMovieDetails(params.movieId).then(movieInformation =>
      setMovieDetails(movieInformation),
    );
  };

  const handleGoBack = () => {
    push(location?.state?.from || routes.home);
  };

  return (
    <main className="MovieDetailsPage">
      <Container>
        <button
          type="button"
          onClick={handleGoBack}
          className="MovieDetailsPage__button"
        >
          Go back
        </button>

        <div className="MovieDetailsPage__card">
          <img
            src={movieDetails.posterPath}
            alt={movieDetails.title}
            className="MovieDetailsPage__poster"
          />
          <div className="MovieDetailsPage__information">
            <h2 className=" MovieDetailsPage__title">{movieDetails.title}</h2>
            <p className="MovieDetailsPage__text">
              <span>Vote/Votes </span>
              <span>{movieDetails.voteAverage}</span>/
              <span>{movieDetails.voteCount}</span>
            </p>
            <h3 className="MovieDetailsPage__title">Overview</h3>
            <p className=" MovieDetailsPage__text">{movieDetails.overview}</p>
            <h4 className="MovieDetailsPage__title">Genres</h4>
            <p className="MovieDetailsPage__text">
              {movieDetails.genres &&
                movieDetails.genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
            </p>
          </div>
        </div>
      </Container>
      <div className="MovieDetailsPage__additional-information">
        <Container>
          <p className="MovieDetailsPage__text">Additional information</p>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: location.state.from,
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: location.state.from,
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </Container>
      </div>

      <Switch>
        <Route path={`${path}/reviews`}>
          {movieDetails?.reviews?.length > 0 ? (
            <Reviews reviews={movieDetails.reviews} />
          ) : (
            <p>We don't have any reviews for this movie</p>
          )}
        </Route>

        <Route path={`${path}/cast`}>
          {movieDetails?.cast?.length > 0 && (
            <Cast actors={movieDetails.cast} />
          )}
        </Route>
      </Switch>
    </main>
  );
};

export default MovieDetailsPage;
