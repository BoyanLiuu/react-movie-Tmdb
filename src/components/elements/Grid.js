import React from 'react';

import { StyledGrid, StyledGridContent } from '../styles/StyledGrid';
//children will contain all the movie thumb we map in the home.js
const Grid = ({ header, children }) => (
  <StyledGrid>
    <h1>{header}</h1>
    <StyledGridContent>{children}</StyledGridContent>
  </StyledGrid>
  
)

export default Grid;