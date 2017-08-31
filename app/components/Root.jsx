import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Profile from './Profile'


export default class WinterJokes extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Router>
        <div>
          <p>Hey</p>
          <a href="/auth/spotify">Login with Spotify</a>
        
          <Switch>
            <Route path='/profile' component={Profile} />
          </Switch>
        </div>
      </Router>
    )
}
}

