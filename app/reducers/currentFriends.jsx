import axios from 'axios';

// Action Types
const GET_FRIENDS = 'GET_FRIENDS';
const NEW_FRIEND = 'NEW_FRIEND';

// Action Creators
export function getFriends(friends) {
    const action = {
        type: GET_FRIENDS,
        friends: friends
    }
    return action;
}

export function newFriend(friend) {
    const action = {
        type: NEW_FRIEND,
        friend: friend
    }
    return action;
}


// Thunk Middleware
export function fetchFriends(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/friends/${id}`)
            .then(res => res.data)
            .then(friends => {
                const action = getFriends(friends);
                dispatch(action)
            })
    }
}

export function postFriend(userId, friendId) {
    return function thunk(dispatch) {
        return axios.post('/api/users/friends', {userId, friendId})
            .then(() => {
                axios.get(`/api/users/${friendId}`)
                    .then(res => res.data)
                    .then(friend => {
                        const action = newFriend(friend);
                        dispatch(action);
                    })
            })
    }
}


export default function messageReducer(state = [], action) {
    switch (action.type) {
        case GET_FRIENDS:
            return action.friends;
        case NEW_FRIEND:
            return [...state, action.friend]
        default:
            return state;
    }
}