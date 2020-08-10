import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Styled from './style';

function Search({ searchKeyword, onSearchChange, onClearSearch }) {
  const inputRef = useRef(null);

  const handleSearchChange = e => {
    const {
      target: { value },
    } = e;
    onSearchChange(value);
  };

  const onClear = () => {
    onClearSearch();
    inputRef.current.focus();
  };

  const renderSearchIcon = () => (
    <InputAdornment position="start">
      <SearchIcon color="action" />
    </InputAdornment>
  );

  const renderCloseIcon = () => (
    <InputAdornment position="end">
      <Styled.IconBtn keyword={searchKeyword} onClick={onClear}>
        <CloseIcon fontSize="small" color="action" />
      </Styled.IconBtn>
    </InputAdornment>
  );

  return (
    <TextField
      placeholder="Search..."
      value={searchKeyword}
      onChange={handleSearchChange}
      inputRef={inputRef}
      InputProps={{
        startAdornment: renderSearchIcon(),
        endAdornment: renderCloseIcon(),
      }}
    />
  );
}

Search.propTypes = {
  searchKeyword: PropTypes.string,
  onSearchChange: PropTypes.func,
  onClearSearch: PropTypes.func,
};

export default Search;
