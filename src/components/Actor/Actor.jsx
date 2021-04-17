import PropTypes from 'prop-types';
import { IMAGE_BASE_URL } from '../../services/apiVariables';
import posterSizes from '../../data/posterSizes';
import getImageSize from '../../utils/imageSizes';
import defaultImage from '../../Images/default-avatar.png';
import './Actor.scss';
const Actor = ({ imgUrl, name, character }) => {
  return (
    <li>
      <img
        src={
          imgUrl
            ? `${IMAGE_BASE_URL}${getImageSize(posterSizes)}${imgUrl}`
            : `${defaultImage}`
        }
        alt={name}
      />
      <p>name: {name}</p>
      <p>character: {character}</p>
    </li>
  );
};
Actor.defaultProps = { imgUrl: defaultImage };
Actor.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default Actor;
