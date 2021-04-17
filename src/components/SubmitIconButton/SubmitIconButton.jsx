import React from 'react';
import PropTypes from 'prop-types';
import './SubmitIconButton.scss';

const SubmitIconButton = ({ children, ...allyProps }) => (
  <button type="submit" className="IconButton" {...allyProps}>
    {children}
  </button>
);
SubmitIconButton.defaultProps = {
  children: [],
};

SubmitIconButton.propTypes = {
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default SubmitIconButton;
