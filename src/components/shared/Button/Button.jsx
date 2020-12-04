import React from 'react';
import PropTypes from 'prop-types';
import { Btn } from './Button.styles';

const Button = (props) => {
  const { type, children, onClick, className } = props
  return (
  <Btn type={type}  onClick={onClick} className={className}> 
    {children}
  </Btn>
)};

Button.propTypes = {
  caption: PropTypes.string,
  handleClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  type: 'button',
  className: '',
  handleClick: () => {}
};

export default Button;
