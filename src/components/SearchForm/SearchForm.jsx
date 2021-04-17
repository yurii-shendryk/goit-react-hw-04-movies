import { useState } from 'react';
import PropTypes from 'prop-types';
import SubmitIconButton from '../SubmitIconButton';
import { ReactComponent as SearchIcon } from '../../icons/seacrh.svg';
import './SearchForm.scss';
const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        className="SearchForm-input"
        type="text"
        name="query"
        value={query}
        autoComplete="off"
        autoFocus
        onChange={handleChange}
      />

      <SubmitIconButton aria-label="close" className="SubmitIconButton">
        <SearchIcon width="17" height="17" />
        <span className="SearchForm-button-label">Search</span>
      </SubmitIconButton>
      {/* <button type="submit" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
      </button> */}
    </form>
  );
};

SearchForm.defaultProps = {
  onSubmit: () => null,
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchForm;
