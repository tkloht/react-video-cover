import React from 'react';
const { element } = React.PropTypes;

import NavBar from './NavBar';
import css from './styles.css';

const propTypes = {
  children: element,
};

const App = props => (
  <div>
    <NavBar />
    <div className={css.App}>
      {props.children}
    </div>
    <footer className={css.Footer}>
      <div>Made by Tobias Kloht</div>
      <div>
        <a href="mailto:tobias.kloht@gmail.com">Email</a>
        <span> - </span>
        <a href="https://www.twitter.com/tkloht">Twitter</a>
        <span> - </span>
        <a href="https://t-obi.github.io/imprint">Imprint</a>
      </div>
    </footer>
  </div>
);

App.propTypes = propTypes;

export default App;
