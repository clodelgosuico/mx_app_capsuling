import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import CapsulingApp from './CapsulingApp';
import CapsulingInfo from './components/CapsulingInfo';
import CapsulingProfileContainer from './redux/containers/CapsulingProfileContainer';
import CapsulingResultsContainer from './redux/containers/CapsulingResultsContainer';

window.onload = () => {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/workwardrobe' component={CapsulingApp}>
        <IndexRoute component={CapsulingInfo}/>
        <Route path='profile' component={CapsulingProfileContainer}/>
        <Route path='results' component={CapsulingResultsContainer}/>
      </Route>
    </Router>
  ), document.getElementById('container'));
};
