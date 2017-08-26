import React, { Component } from 'react';
import CampusHome from './CampusHome'
import store from '../store';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

export default class WinterJokes extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path ="/" component={CampusHome} />
          </Switch>
        </div>
      </Router>
    )
}
}

