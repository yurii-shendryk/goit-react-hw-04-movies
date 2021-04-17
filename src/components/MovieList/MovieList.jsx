import PropTypes from 'prop-types';
import MoviewPreview from '../MoviewPreview';
import Container from '../Container';
import './MovieList.scss';
const MovieList = ({ movies, query }) => {
  console.log(movies);
  return (
    <Container>
      <ul className="MovieList">
        {movies.map(({ id, poster_path, name, title }) => (
          <MoviewPreview
            key={id}
            id={id}
            imgUrl={poster_path}
            name={name}
            title={title}
            query={query}
          />
        ))}
      </ul>
    </Container>
  );
};
MovieList.defaultProps = {
  query: null,
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  query: PropTypes.string,
};

export default MovieList;
