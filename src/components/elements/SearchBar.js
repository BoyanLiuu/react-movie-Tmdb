import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';

import { 
  StyledSearchBar,
  StyledSearchBarContent 
} from '../styles/StyledSearchBar';
//this callback function come from home component
const SearchBar = ({ callback }) => {
  //create state variable
  const [state, setState] = useState('');
  //if you have value you want to mutate
  const timeOut = useRef(null);

  const doSearch = event => {
    //destructing the object
    const { value } = event.target;
    
    clearTimeout(timeOut.current);
    setState(value);
    //whenever user type something, it will wait for half second , to finish typing complete words
    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  }

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <FontAwesome className="fa-search" name="search" size="2x" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={doSearch}
          value={state}
        />
      </StyledSearchBarContent>
    </StyledSearchBar>
  )
}

export default SearchBar;