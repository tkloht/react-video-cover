import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import css from './NavBar.module.css';

class Navitem extends Component {

  static propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    return (
      <li>
        <Link
          activeClassName={css.active}
          to={this.props.to}
        >
          {this.props.label}
          <div className={css.activeItemIndicator} />
        </Link>
      </li>
    );
  }
}

export default Navitem;
