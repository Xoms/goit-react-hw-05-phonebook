import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactsListItem from './ContactsListItem';
import  './ContactsList.scss';

const ContactsList = ({contacts, onContactDelete}) => (
  <TransitionGroup component="ul" className="contacts-list">
    {contacts.map( ({id, ...rest}) => {
      return (
        <CSSTransition key={id} timeout={250} classNames="contacts-items">
          <ContactsListItem  id={id} {...rest} onDelete={onContactDelete} />
        </CSSTransition>
      )
    })}
  </TransitionGroup>
);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string
  })).isRequired,
  onContactDelete: PropTypes.func.isRequired
};

ContactsList.defaultProps = {
  // bla: 'test',
};

export default ContactsList;
