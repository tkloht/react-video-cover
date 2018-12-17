import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import css from '../pages/styles.module.css';

const propTypes = {
  children: PropTypes.element,
};

const App = props => (
  <div className={css.App}>
    <NavBar />
    <div className={css.Content}>
      {props.children}
    </div>
    <footer className={css.Footer}>
      <div>Made by Tobias Kloht</div>
      <div>
        <a href="mailto:mail@kloht.com">Email</a>
        <span> - </span>
        <a href="https://www.twitter.com/tkloht">Twitter</a>
        <span> - </span>
        <a href="https://tkloht.github.io/imprint">Imprint</a>
      </div>
    </footer>
  </div>
);

App.propTypes = propTypes;

export default App;
