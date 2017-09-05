import axios from 'axios';

// Action Types
const GET_PLAYLIST = 'GET_PLAYLIST';

// Action Creators
export function getPlaylist(playlist) {
    const action = {
        type: GET_PLAYLIST,
        playlist: playlist
    }
    return action;
}


// Thunk Middleware
export function fetchSinglePlaylist(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/playlists/${id}`)
            .then(res => res.data)
            .then(playlist => {
                const action = getPlaylist(playlist);
                dispatch(action)
            })
    }
}

export default function singlePlaylistReducer(state = {}, action) {
    switch (action.type) {
        case GET_PLAYLIST:
            return action.playlist;
        default:
            return state;
    }
}