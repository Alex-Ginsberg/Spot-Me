import axios from 'axios';

// Action Types
const SET_STUDENTS = 'SET_STUDENTS';

// Action Creator
export function setStudents(currentStudents) {
    const action = {
        type: SET_STUDENTS,
        currentStudents: currentStudents
    };
    return action;
}

// Thunk Middleware
export function fetchCurrentStudents(id) {    
        return function thunk(dispatch) {
            return axios.get(`/api/all/${id}`)
                .then(res => res.data)
                .then(students => {
                    const action = setStudents(students);
                    dispatch(action);
                });
        }
}

// Reducer
export default function currentStudents(state = [], action) {   
        switch (action.type) {
            case SET_STUDENTS:
                return action.currentStudents
            default:
                return state;
        }    
}