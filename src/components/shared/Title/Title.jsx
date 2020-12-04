import React from 'react';
import PropTypes from 'prop-types';
import { StyledTitle } from './Title.styles';

const Title = ({title}) => (
  <StyledTitle className="title">
    {title}
  </StyledTitle>
);

Title.propTypes = {
  title: PropTypes.string.isRequired
};

Title.defaultProps = {
  // bla: 'test',
};

export default Title;
