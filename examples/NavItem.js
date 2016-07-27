import React, { Component, PropTypes } from 'react';
import css from './NavBar.css';

import { IndexLink } from 'react-router';

class Navitem extends Component {

  static propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    return (
      <li>
        <IndexLink
          activeClassName={css.active}
          to={this.props.to}
        >
          {this.props.label}
          <div className={css.foo} />
        </IndexLink>
      </li>
    );
  }
}

export default Navitem;
