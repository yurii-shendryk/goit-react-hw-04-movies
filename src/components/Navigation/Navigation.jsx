import { NavLink } from 'react-router-dom';
import Container from '../Container';
import routes from '../../routes';
import './Navigation.scss';

const Navigation = () => {
  return (
    <Container>
      <nav className="Navigation">
        <ul className="Navigation-list">
          <li className="Navigation-list__item">
            <NavLink
              exact
              to={routes.home}
              className="Navigation-link"
              activeClassName="Navigation-link--active"
            >
              Home
            </NavLink>
          </li>
          <li className="Navigation-list__item">
            <NavLink
              to={routes.movies}
              className="Navigation-link"
              activeClassName="Navigation-link--active"
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Navigation;
