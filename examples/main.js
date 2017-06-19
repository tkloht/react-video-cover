import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routes from './routes';

render(
  <HashRouter>
  	<Routes />
  </HashRouter>,
  document.getElementById('app')
);
