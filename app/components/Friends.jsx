import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import store from '../store'
import {fetchFriends} from '../reducers/currentFriends'

export default class Friends extends Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount(){
        const friendsThunk = fetchFriends(this.state.userReducer.id)
        store.dispatch(friendsThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
  
    componentWillUnmount () {
      this.unsubscribe();
    }

    render() {
        return (
        <div className="row">
            {this.state.currentFriends.map(friend => (
                <div className="col-lg-6">
                    <img src={friend.proPic} />
                    <p>{friend.name}</p>
                </div>
            ))}
        </div>
        )
    }
}