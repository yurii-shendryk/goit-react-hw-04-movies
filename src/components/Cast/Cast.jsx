import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';
import Actor from '../Actor';
import './Cast.scss';
const Cast = ({ actors }) => {
  console.log(actors);
  return (
    <Container>
      <ul className="Cast-list">
        {actors.map(({ profile_path, id, name, character }) => (
          <Actor
            key={id}
            imgUrl={profile_path}
            name={name}
            character={character}
          />
        ))}
      </ul>
    </Container>
  );
};

Cast.propTypes = {
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default Cast;
