import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {postChat} from '../reducers/chats'
import store from '../store'
import axios from 'axios'


export default class Chats extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.handlePlaylistSubmit = this.handlePlaylistSubmit.bind(this);
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
  
    componentWillUnmount () {
      this.unsubscribe();
    }

    handlePlaylistSubmit(e) {
        e.preventDefault();
        const likesNeeded = e.target.playlistLikesNeeded.value
    
        let jsonData = {
          name: e.target.playlistName.value,
          public: false,
          description: e.target.playlistDescription.value
          };
    
          // Send the entered data to create a playlist in spotify and the database
          axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/${this.state.userReducer.SpotifyId}/playlists`,
            data: jsonData,
            dataType: 'json',
            headers: {
                  'Authorization': 'Bearer ' + this.state.userReducer.accessToken,
                  'Content-Type': 'application/json'
            }})
              .then(res => {
                const data = {
                  name: res.data.name,
                  externalUrl: res.data.external_urls.spotify,
                  playlistId: res.data.id,
                  userId: this.state.userReducer.id,
                  likesNeeded: likesNeeded
                }
                const postChatThunk = postChat(data, this.state.userReducer.id)
                store.dispatch(postChatThunk)
              })
            this.props.history.push('/chats')
      }

    render() {
        return(
        <div>
            <form onSubmit={this.handlePlaylistSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Create a Playlist</label>
                    <input className="form-control" type="text" name="playlistName" placeholder="Enter playlist name" required />
                    <input className="form-control" type="text" name="playlistDescription" placeholder="Enter description"   />
                    <input className="form-control" type="text" name="playlistLikesNeeded" placeholder="Select the number of likes needed for a song to be added to your playlist"   />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Create Playlist</button>
                </div>
            </form>
        </div>
        )
    }
}