import React from 'react';
import { LoaderContainer } from './Loader.styles';
import './Loader.scss'

const Loader = (props) => (
  <LoaderContainer>
    <div className="lds-ripple"><div></div><div></div></div>
  </LoaderContainer>
  
);


export default Loader;
