import React, { Component } from 'react';
import css from './NavBar.css';
import NavItem from './NavItem';
import { IndexLink } from 'react-router';
import { GithubLogo } from './Icons.js';
/* global CONFIG */

class NavBar extends Component {
  render() {
    return (
      <div className={css.NavBar}>
        <h1><IndexLink to="/">react-video-cover</IndexLink></h1>
        <ul>
          <NavItem to="/resizable" label="Example 1" />
          <NavItem to="/background" label="Example 2" />
          <NavItem to="/minimal" label="Example 3" />
        </ul>
        <div className={css.ExternalNav}>
          <a href="http://github.com/t-obi/react-video-cover/">
            <GithubLogo />
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
