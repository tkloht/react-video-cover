import './styles.css';
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NoMatch from './components/NoMatch';
import CoverExample1 from './components/Cover';
import CoverExample2 from './components/Examples/BackgroundCover';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={CoverExample1} />
      <Route path="example1" component={CoverExample1} />
      <Route path="example2" component={CoverExample2} />
    </Route>
    <Route path="*" status={404} component={NoMatch} />
  </Route>
);
