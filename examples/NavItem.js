import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import css from './NavBar.css';

class Navitem extends Component {

  static propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    return (
      <li>
        <NavLink
          activeClassName={css.active}
          to={this.props.to}
        >
          {this.props.label}
          <div className={css.activeItemIndicator} />
        </NavLink>
      </li>
    );
  }
}

export default Navitem;
