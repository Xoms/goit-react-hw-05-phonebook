import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Filter.scss';


const Filter = ({onFilter, isVisible}) => (

  <CSSTransition in={isVisible}   
          classNames="filterErr" 
          appear={true}
          unmountOnExit 
          timeout={250}>

          <div className="filter">
            <label htmlFor="filterInput" classNames="filter__label">Find contacts by name</label>
            <input type="text" id="filterInput" onChange={onFilter} className="filter__input"/>
          </div>

  </CSSTransition>
  
);

Filter.propTypes = {
   onFilter: PropTypes.func.isRequired,
};


export default Filter;
