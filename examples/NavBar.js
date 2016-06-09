import React from 'react';
import css from './styles.css';

import { IndexLink } from 'react-router';


const NavBar = () => (
  <div className={css.NavBar}>
    <h1>Cover Example</h1>
    <ul>
      <li><IndexLink to="/resizable">Example 1</IndexLink></li>
      <li><IndexLink to="/background">Example 2</IndexLink></li>
      <li><IndexLink to="/minimal">Example 3</IndexLink></li>
    </ul>
  </div>
);

export default NavBar;
