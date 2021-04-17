import React from 'react';
import PropTypes from 'prop-types';
import Actor from '../Actor';
const Cast = ({ actors }) => {
  console.log(actors);
  return (
    <ul>
      {actors.map(({ profile_path, id, name, character }) => (
        <Actor
          key={id}
          imgUrl={profile_path}
          name={name}
          character={character}
        />
      ))}
    </ul>
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
