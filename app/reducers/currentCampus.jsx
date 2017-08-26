import axios from 'axios';

// Action Types
const SET_CAMPUS = 'SET_CAMPUS';

// Action Creator
export function setCampus(currentCampus) {
    console.log(currentCampus)
    const action = {
        type: SET_CAMPUS,
        currentCampus: currentCampus
    };
    return action;
}

// Thunk Middleware
export function fetchCampus(id) {   
    console.log('here') 
        return function thunk(dispatch) {
            return axios.get(`/api/campus/${id}`)
                .then(res => res.data)
                .then(campus => {
                    const action = setCampus(campus);
                    dispatch(action);
                });
        }
}

// Reducer
export default function currentCampus(state = '', action) {   
        switch (action.type) {
            case SET_CAMPUS:
                return action.currentCampus
            default:
                return state;
        }    
}