import './styles.css';
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import NoMatch from './NoMatch';
import CoverExample1 from './ResizableCoverExample';
import CoverExample2 from './BackgroundCoverExample';

export default (
  <Route>
    <Route path="/react-video-cover" component={App}>
      <IndexRoute component={CoverExample1} />
      <Route path="example1" component={CoverExample1} />
      <Route path="example2" component={CoverExample2} />
    </Route>
    <Route path="*" status={404} component={NoMatch} />
  </Route>
);
