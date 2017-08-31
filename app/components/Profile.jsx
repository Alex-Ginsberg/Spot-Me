import React, { Component } from 'react';
import {loadUser} from '../reducers/userReducer'
import store from '../store'
import {connect} from 'react-redux';

const mapStateToProps = function (state) {
  return {
    user: state.userReducer
  };
}
store.dispatch(loadUser());
function Profile(props) {
    
    console.log('USER: ', props.user)
    return (
    <div>
        <p>Profile</p>
        <p>{props.user.id}</p>
        <p>{props.user.name}</p>
        <p>{props.user.SpotifyId}</p>
    </div>
    )
}

const ProfileContainer = connect(mapStateToProps)(Profile); 

export default ProfileContainer;