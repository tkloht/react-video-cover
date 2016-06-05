import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import routes from './routes';

import { createHistory } from 'history';

const history = useRouterHistory(createHistory)({
  basename: '/react-video-cover',
});

render(
  <Router history={history} routes={routes} />,
  document.getElementById('app')
);
