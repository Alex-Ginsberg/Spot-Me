import React, { Component } from 'react';
import CampusHome from './CampusHome'
import store from '../store';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SingleCampus from './SingleCampus'
import Navbar from './Navbar'

export default class WinterJokes extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Router>
        <div>
        <Navbar />
          <Switch>
            <Route exact path ="/" component={CampusHome} />
            <Route path = "/campus/:campusId" component={SingleCampus} />
          </Switch>
        </div>
      </Router>
    )
}
}

