import axios from 'axios';

// Action Types
const GET_CHATS = 'GET_CHATS';
const NEW_CHAT = 'NEW_CHAT';

// Action Creators
export function getChats(chats) {
    const action = {
        type: GET_CHATS,
        chats: chats
    }
    return action;
}

export function newChat(chat) {
    const action = {
        type: NEW_CHAT,
        chat: chat
    }
    return action;
}


// Thunk Middleware
export function fetchChats() {
    return function thunk(dispatch) {
        return axios.get('/api/playlists')
            .then(res => res.data)
            .then(chats => {
                const action = getChats(chats);
                dispatch(action)
            })
    }
}

export function postChat(chat) {
    return function thunk(dispatch) {
        return axios.post('/api/playlists', chat)
            .then(res => res.data)
            .then(chat => {
                const action = newChat(chat);
                dispatch(action);
            })
    }
}

export default function messageReducer(state = [], action) {
    switch (action.type) {
        case GET_CHATS:
            return action.chats;
        case NEW_CHAT:
            return [...state, action.chat]
        default:
            return state;
    }
}