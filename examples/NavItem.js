import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import css from './NavBar.css';

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
