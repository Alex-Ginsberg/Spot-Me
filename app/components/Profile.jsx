import React, { Component } from 'react';
import {loadUser} from '../reducers/userReducer'
import store from '../store'
import {connect} from 'react-redux';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {fetchChats} from '../reducers/chats'

export default class Profile extends Component {
  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    store.dispatch(loadUser());
    const chatsThunk = fetchChats();
    store.dispatch(chatsThunk)
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    const filterChats = this.state.chats.filter(chat => chat.userId === this.state.userReducer.id);

    return (
          <div>
              <h1>{this.state.userReducer.name}'s Profile</h1>
              <p>Display name: {this.state.userReducer.name}</p>
              <img src={this.state.userReducer.proPic} />
              <p>Chats created by this user: </p>
              {filterChats.map(chat => (
                <div className='col-lg-4' key={chat.id}>
                        <Link to={`/chats/${chat.id}`}>
                            <h2>{chat.name}</h2>
                        </Link>
                    </div>
              ))}
          </div>
          )
  }

}