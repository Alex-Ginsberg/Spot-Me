import axios from 'axios';

// Action Types
const GET_CAMPUSES = 'GET_CAMPUSES';

// Action Creator
export function getCampuses(campuses) {
    const action = {
        type: GET_CAMPUSES,
        campuses: campuses
    };
    return action;
}

// Thunk Middleware
export function fetchCampuses() {    
        return function thunk(dispatch) {
            return axios.get('/api/campus')
                .then(res => res.data)
                .then(campuses => {
                    const action = getCampuses(campuses);
                    dispatch(action);
                });
        }
}

// Reducer
export default function campuses(state = [], action) {   
        switch (action.type) {
            case GET_CAMPUSES:
                return action.campuses
            default:
                return state;
        }    
}