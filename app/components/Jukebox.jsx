import React, { Component } from 'react';
import store from '../store'
import axios from 'axios'
import {fetchSongs, postSong, putSong} from '../reducers/songs'

export default class Jukebox extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleSongSubmit = this.handleSongSubmit.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.audio = document.createElement('audio');
    }

    componentDidMount() {
        const songsThunk = fetchSongs();
        store.dispatch(songsThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleSongSubmit(e) {
        e.preventDefault();
        axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search?q=track:${e.target.songName.value}%20artist:${e.target.songArtist.value}&type=track`,
            headers: {
                'Authorization': 'Bearer ' + this.state.userReducer.accessToken,
            }}
            )
            .then(res => {
                const song = res.data.tracks.items[0];
                console.log(song)
                const postThunk = postSong(song, this.props.currentChat);
                store.dispatch(postThunk)
            })
    }

    addToPlaylist(song) {
            axios.get(`/api/playlists/${this.props.playlist.id}`)
                .then(res => res.data)
                .then(stuff => 
                    axios({
                        method: 'post',
                        url: `https://api.spotify.com/v1/users/${stuff.user.SpotifyId}/playlists/${this.props.playlist.playlistId}/tracks?uris=${song.uri}`,
                        headers: {
                            'Authorization': 'Bearer ' + stuff.user.accessToken,
                            'Content-Type': 'application/json'
                        }}))
    }


    render() {
        const filteredSongs = this.state.songs.filter(song => song.playlistId === this.props.currentChat);
        return (
            <div>
                <h3>Number of likes needed per song: {this.props.playlist.likesNeeded}</h3>
                <form onSubmit={this.handleSongSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Get a Song</label>
                    <input className="form-control" type="text" name="songName" placeholder="Enter song name" required />
                    <input className="form-control" type="text" name="songArtist" placeholder="Enter artist" required  />
                </div>
                <div className="form-group">
                        <button type="submit" className="btn btn-default">Get Song</button>
                </div>
                </form>
                {filteredSongs.map(song => (
                    <div key={song.id} id="song">
                        <img id="songImg" src={song.image}/>
                        <p id="songInfo">{song.name} - {song.artist}</p>
                        <button onClick={() => {
                            this.audio.src = song.preview_url 
                            this.audio.load()
                            this.audio.play()}}>Play</button>
                        <button id={`likeButton${song.id}`} onClick={() => {
                           const likeThunk = putSong(song)
                           store.dispatch(likeThunk) 
                           if (song.likes === this.props.playlist.likesNeeded - 1) {this.addToPlaylist(song); }
                           document.getElementById('likeButton' + song.id).disabled = true;
                           }}>Likes: {song.likes}</button>
                    </div>
                ))}
            </div>
        )
    }
}