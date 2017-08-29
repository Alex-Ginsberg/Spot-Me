import React, { Component } from 'react';
import CampusHome from './CampusHome'
import store from '../store';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SingleCampus from './SingleCampus'
import Navbar from './Navbar'
import Students from './Students'
import SingleStudent from './SingleStudent'
import AddCampus from './AddCampus'
import CampusEdit from './CampusEdit'

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
            <Route exact path="/campus/add" component={AddCampus} />
            <Route exact path = "/campus/:campusId" component={SingleCampus} />
            <Route exact path="/students" component={Students} />
            <Route path = "/students/:id" component={SingleStudent} />
            <Route path = "/campus/:campusId/edit" component={CampusEdit} />
          </Switch>
        </div>
      </Router>
    )
}
}

