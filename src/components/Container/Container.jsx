import PropTypes from 'prop-types';

import './Container.scss';
const Container = ({ children }) => <div className="Container">{children}</div>;

Container.defaultProps = {
  children: [],
};

Container.propTypes = {
  children: PropTypes.node,
};
export default Container;
