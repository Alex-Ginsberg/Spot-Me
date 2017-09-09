import axios from 'axios';

// Action Types
const GET_USERS = 'GET_USERS';

// Action Creators
export function getUsers(users) {
    const action = {
        type: GET_USERS,
        users: users
    }
    return action;
}


// Thunk Middleware
export function fetchUsers() {
    return function thunk(dispatch) {
        return axios.get(`/api/users`)
            .then(res => res.data)
            .then(users => {
                const action = getUsers(users);
                dispatch(action)
            })
    }
}


export default function messageReducer(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        default:
            return state;
    }
}