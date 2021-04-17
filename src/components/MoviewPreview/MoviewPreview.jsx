import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IMAGE_BASE_URL } from '../../services/apiVariables';
import posterSizes from '../../data/posterSizes';
import getImageSize from '../../utils/imageSizes';
import defaultPoster from '../../Images/movie-poster-default.png';
import './MoviewPreview.scss';

const MoviewPreview = ({ query, imgUrl, id, title, name }) => {
  const location = useLocation();
  return (
    <li className="MoviewPreview">
      <NavLink
        className="MoviewPreview__link"
        to={{
          pathname: `/movies/${id}`,
          state: {
            from: location,
            query,
          },
        }}
      >
        <img
          className="MoviewPreview__image"
          src={
            imgUrl
              ? `${IMAGE_BASE_URL}${getImageSize(posterSizes)}${imgUrl}`
              : `${defaultPoster}`
          }
          alt={name}
        />

        <h5 className="MoviewPreview__title">{title || name}</h5>
      </NavLink>
    </li>
  );
};

MoviewPreview.defaultProps = {
  query: null,
  imgUrl: null,
  title: null,
  name: null,
};

MoviewPreview.propTypes = {
  query: PropTypes.string,
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
};

export default MoviewPreview;
