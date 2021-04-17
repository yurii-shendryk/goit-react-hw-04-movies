import PropTypes from 'prop-types';
import './ReviewItem.scss';
const ReviewItem = ({ author, content }) => {
  return (
    <li className="Reviews__item">
      <h4 className="Reviews__author">Author: {author}</h4>
      <p className="Reviews__content">{content}</p>
    </li>
  );
};

ReviewItem.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ReviewItem;
