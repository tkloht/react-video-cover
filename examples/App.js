import React from 'react';
const { element } = React.PropTypes;

import { IndexLink } from 'react-router';
import Title from 'react-title-component';

const propTypes = {
  children: element,
};

const App = props => (
  <div>
    <div>
      <Title render="Awesome App" />
      <h1>Cover Example</h1>
      <ul>
        <li><IndexLink to="/example1">Example 1</IndexLink></li>
        <li><IndexLink to="/example2">Example 2</IndexLink></li>
      </ul>
    </div>
    {props.children}
  </div>
);

App.propTypes = propTypes;

export default App;
