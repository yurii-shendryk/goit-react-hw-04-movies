import { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
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
import Error from '../../components/Error';
import Loader from '../../components/Loader';

import { fetchMovieDetails } from '../../services/moviesApi';
import './MovieDetailsPage.scss';

let source;

const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "rewiews" */),
);
const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast" */),
);
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
    cast: null,
    reviews: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = () => {
      source = axios.CancelToken.source();
      fetchMovieDetails(params.movieId, source)
        .then(movieInformation => setMovieDetails(movieInformation))
        .catch(error => setError(error));
    };
    getMovieDetails();
    return () => {
      if (source) {
        source.cancel('Please, reload previous page');
      }
    };
  }, [params.movieId]);

  const handleGoBack = () => {
    push(location?.state?.from || routes.home);
  };
  console.log(error);

  return (
    <>
      {error ? (
        <Error />
      ) : (
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
                <h2 className=" MovieDetailsPage__title">
                  {movieDetails.title}
                </h2>
                <p className="MovieDetailsPage__text">
                  <span>User Score: </span>
                  <span>{movieDetails.voteAverage * 10}%</span>
                </p>
                <h3 className="MovieDetailsPage__title">Overview</h3>
                <p className=" MovieDetailsPage__text">
                  {movieDetails.overview}
                </p>
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
          <div className="Additional-information">
            <Container>
              <h3 className="Additional-information__title">
                Additional information
              </h3>
              <ul className="Additional__information-list">
                <li className="Additional__information-item">
                  <NavLink
                    className="Additional__information-link"
                    activeClassName="Additional__information-link--active"
                    to={{
                      pathname: `${url}/cast`,
                      state: {
                        from: location?.state?.from,
                      },
                    }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className="Additional__information-item">
                  <NavLink
                    className="Additional__information-link"
                    activeClassName="Additional__information-link--active"
                    to={{
                      pathname: `${url}/reviews`,
                      state: {
                        from: location?.state?.from,
                      },
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </Container>
          </div>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={`${path}/reviews`}>
                {movieDetails?.reviews?.length > 0 ? (
                  <Reviews reviews={movieDetails.reviews} />
                ) : (
                  <Container>
                    <p style={{ paddingBottom: '30px' }}>
                      We don't have any reviews for this movie
                    </p>
                  </Container>
                )}
              </Route>

              <Route path={`${path}/cast`}>
                {movieDetails?.cast?.length > 0 && (
                  <Cast actors={movieDetails.cast} />
                )}
              </Route>
            </Switch>
          </Suspense>
        </main>
      )}
    </>
  );
};

export default MovieDetailsPage;
