import PropTypes from 'prop-types';
import ReviewItem from '../ReviewItem';
import Container from '../Container';
import './Reviews.scss';
const Reviews = ({ reviews }) => {
  return (
    <Container>
      <ul className="Reviews">
        {reviews.map(({ author, content, id }) => (
          <ReviewItem key={id} author={author} content={content} id={id} />
        ))}
      </ul>
    </Container>
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
