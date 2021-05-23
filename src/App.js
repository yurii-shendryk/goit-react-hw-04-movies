import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import routes from './routes';
import Loader from './components/Loader';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

const ErrorPage = lazy(() =>
  import(
    './pages/ErrorPage/ErrorPage' /* webpackChunkName: "movie-details-page" */
  ),
);

const App = () => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={routes.home}>
            <HomePage />
          </Route>
          <Route path={routes.movieDetails}>
            <MovieDetailsPage />
          </Route>
          <Route path={routes.movies}>
            <MoviesPage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
