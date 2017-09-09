import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import store from '../store'
import {fetchUsers} from '../reducers/users'
import {postFriend} from '../reducers/currentFriends'

export default class Find extends Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount(){
        const usersThunk = fetchUsers()
        store.dispatch(usersThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
  
    componentWillUnmount () {
      this.unsubscribe();
    }

    render() {
        return (
        <div className="row">
            {this.state.users.map(user => (
                <div className="col-lg-6" key={user.id}>
                    <img src={user.proPic} />
                    <p>{user.name}</p>
                    <button className='btn btn-success' onClick={() => {
                        const newFriendThunk = postFriend(this.state.userReducer.id, user.id)
                        store.dispatch(newFriendThunk)}}>Add Friend</button>
                </div>
            ))}
        </div>
        )
    }
}