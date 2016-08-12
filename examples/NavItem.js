import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import css from './NavBar.css';

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
          <div className={css.activeItemIndicator} />
        </IndexLink>
      </li>
    );
  }
}

export default Navitem;
