import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Profile from './Profile'
import Chats from './Chats'
import SingleChat from './SingleChat'
import Navbar from './Navbar'
import Friends from './Friends'
import Find from './Find'
import NewChat from './NewChat'


export default class WinterJokes extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Router>
        <div>
          <Navbar />
          <a href="/auth/spotify">Login with Spotify</a>
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route exact path='/chats' component={Chats} />
            <Route path='/chats/:id' component={SingleChat} />
            <Route path='/friends' component={Friends} />
            <Route path='/find' component={Find} />
            <Route path='/newchat' component={NewChat} />
          </Switch>
        </div>
      </Router>
    )
}
}

