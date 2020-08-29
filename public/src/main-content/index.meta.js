import React from 'react';
import Welcome from './../Index/Welcome/Welcome.js';
import Portfolio from './../Index/Portfolio/Portfolio.js';
import Contact from './../Index/Contact/Contact.js';

export default {

  get WELCOME() {

    return props => (
      <Welcome {...props} />
    )
  },

  get PORTFOLIO() {

    return props => (
      <Portfolio {...props} />
    )
  },

  get CONTACT() {

    return props => (
      <Contact {...props} />
    )
  },

  get DEFAULT() {

    return this.WELCOME;
  }

};
