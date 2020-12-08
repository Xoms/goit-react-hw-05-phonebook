import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';


import Title from './components/shared/Title';
import Container from './components/shared/Container';
import PhonesForm from './components/PhonesForm';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';

import './App.scss';

class App extends Component {

  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount(){
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
    ];
    this.setState( {contacts} );
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  onContactAdd = (contact) => {
    this.setState( state => {
      const contacts = [...state.contacts, contact]
      return { contacts }
    })
    
  }

  onContactDelete = (contactId) => {
    this.setState( state => {
      const contacts = state.contacts.filter( ({id}) => contactId !== id )
      return {
        contacts
      }
    });
  }

  onFilterChange = ({target}) => {
    this.setState({
        filter: target.value
      })
  }

  render(){
    const {contacts, filter} = this.state
    
    const visibleContacts = contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
    console.log(visibleContacts.length > 1)
    return (
      <Container className="container phonebook">
        <CSSTransition in={false} 
          // appear={true}
          classNames="fade" 
          unmountOnExit 
          timeout={500}>
          <Title title="Phonebook"/>

        </CSSTransition>
  

        <PhonesForm onContactAdd={this.onContactAdd} contacts={contacts}/>
        <Title title="Contacts" className="main-title"/>
        <Filter onFilter={this.onFilterChange} isVisible={contacts.length > 1}/>
        
        
        <ContactsList onContactDelete={this.onContactDelete} contacts={visibleContacts}/>

      </Container>
    );
  }
  
}

export default App;
