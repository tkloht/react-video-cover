import React from 'react';
import { Route, Switch} from 'react-router-dom';
import App from './App';
import NoMatch from './NoMatch';
import MinimalExample from './MinimalExample';
import ResizableExample from './ResizableCoverExample';
import BackgroundExample from './BackgroundCoverExample';
import Home from './Home';

export default () => (
    <App>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/resizable" component={ResizableExample} />
            <Route path="/background" component={BackgroundExample} />
            <Route path="/minimal" component={MinimalExample} />
            <Route status={404} component={NoMatch} />
        </Switch>
    </App>
);
