import PropTypes from 'prop-types';
import ReviewItem from '../ReviewItem';
const Reviews = ({ reviews }) => {
  return (
    <>
      <ul className="Reviews__list">
        {reviews.map(({ author, content, id }) => (
          <ReviewItem key={id} author={author} content={content} id={id} />
        ))}
      </ul>
    </>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

export default Reviews;
