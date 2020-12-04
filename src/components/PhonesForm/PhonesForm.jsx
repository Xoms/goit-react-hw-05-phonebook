import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';
import { CSSTransition } from 'react-transition-group';

import './PhonesForm.styles.scss';
import ErrMsg from '../shared/ErrorMessage';
import Button from "../shared/Button";

class PhonesForm extends Component  {
  state = {
    name: '',
    number: '',
    isExist: false
  }

  changeHandler = ({target}) => {
    this.setState( () => {
      return {
        [target.name]: target.value
      }
    })
  }

  submitHandler = (e) => {
    e.preventDefault();

    if (this.isContactExists(this.state.name)){
      this.setState({
        isExist: true
      })
      setTimeout(() => this.setState({isExist: false}), 2000)
      return;
    }

    const newRecord = this.makeRecord()
    this.setState({
      name: '',
      number: '',
      isExist: false
      })
    this.props.onContactAdd(newRecord);
  }

  isContactExists(currName){
    return (this.props.contacts.some( ({name}) => name === currName))
  }

  makeRecord(){
    const id = uuid();
    const {name, number} = this.state;
    return {id, name, number}
  }

  hideErrMsg = ()=> {
    this.setState({isExist: false});
  }

  render(){
    const {name, number, isExist} = this.state
    return (
      <form className="contacts-form" onSubmit={this.submitHandler}>

        <CSSTransition in={isExist} 
        classNames="err" 
        appear={true}
        unmountOnExit 
        timeout={250}>
          <ErrMsg content="This person is already in your contacts list" onClick={this.hideErrMsg}/>
        </CSSTransition>

        <div className="contacts-form__group">
          <label className="contacts-form__label" htmlFor="contactName" >Name</label>
          <input className="contacts-form__input" 
            onChange={this.changeHandler} 
            id="contactName"
            name="name"
            value={name}/>
        </div>

        <div className="contacts-form__group">
          <label className="contacts-form__label" htmlFor="contactNumber">Number</label>
          <input 
            className="contacts-form__input" 
            onChange={this.changeHandler} 
            id="contactNumber"
            name="number"
            value={number}/>
        </div>

        <Button type="submit" className="contacts-form__submit-btn">Add contact</Button>       
      </form>
    )
  }  
};

PhonesForm.propTypes = {
  onContactAdd: PropTypes.func.isRequired,
};

export default PhonesForm;
