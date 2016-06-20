import React from 'react';
import css from './styles.css';

import { IndexLink } from 'react-router';


const NavBar = () => (
  <div className={css.NavBar}>
    <h1>react-video-cover</h1>
    <ul>
      <li><IndexLink to="/resizable">Example 1</IndexLink></li>
      <li><IndexLink to="/background">Example 2</IndexLink></li>
      <li><IndexLink to="/minimal">Example 3</IndexLink></li>
    </ul>
    <div className={css.ExternalNav}>
      <a href="http://github.com/t-obi/react-video-cover/">
        <img alt="View on GitHub" src="/GitHub-Mark-32px.png" />
      </a>
    </div>
  </div>
);

export default NavBar;
