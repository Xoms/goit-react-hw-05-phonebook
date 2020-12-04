import React from 'react';
import PropTypes from 'prop-types';
import './Filter.scss';


const Filter = ({onFilter}) => (
  <div className="filter">
    <label htmlFor="filterInput" className="filter__label">Find contacts by name</label>
    <input type="text" id="filterInput" onChange={onFilter} className="filter__input"/>
  </div>
);

Filter.propTypes = {
   onFilter: PropTypes.func.isRequired,
};


export default Filter;
