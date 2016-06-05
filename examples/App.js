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
  </div>
);

App.propTypes = propTypes;

export default App;
