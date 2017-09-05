import axios from 'axios';
import socket from '../socket';
import update from 'react-addons-update';

// Action Types
const GET_SONGS = 'GET_SONGS';
const NEW_SONG = 'NEW_SONG';
const NEW_LIKE = 'NEW_LIKE'

// Action Creators
export function getSongs(songs) {
    const action = {
        type: GET_SONGS,
        songs: songs
    }
    return action;
}


export function newSong(song) {
    const action = {
        type: NEW_SONG,
        song
    };
    return action;
}

export function newLike(songs) {
    const action = {
        type: NEW_LIKE, 
        songs
    };
    return action;
}

// Thunk Middleware
export function fetchSongs() {
    return function thunk(dispatch) {
        return axios.get('/api/songs')
            .then(res => res.data)
            .then(songs => {
                const action = getSongs(songs);
                dispatch(action)
            })
    }
}

export function postSong(song, chatId) {
    return function thunk(dispatch) {
        return axios.post('/api/songs', {song, chatId})
            .then(res => res.data)
            .then(song => {
                const action = newSong(song);
                dispatch(action);
                socket.emit('new-song', song);
            });
    }
}

export function putSong(song) {
    return function thunk(dispatch) {
        return axios.put(`/api/songs/${song.id}`)
            .then(res => res.data)
            .then(() => {
                axios.get('/api/songs')
                    .then(res => res.data)
                    .then(songs => {
                        const action = newLike(songs)
                        dispatch(action)
                        socket.emit('new-like', songs)
                    })
            })
    }
}


export default function messageReducer(state = [], action) {
    switch (action.type) {
        case GET_SONGS:
            return action.songs;
        case NEW_SONG:
            return [...state, action.song]
        case NEW_LIKE:          
            return action.songs
        default:
            return state;
    }
}