import axios from 'axios';

// Action Types
const GET_STUDENT = 'GET_STUDENT';


// Action Creator
export function getStudent(student) {
    const action = {
        type: GET_STUDENT,
        student: student
    };
    return action;
}

// Thunk Middleware
export function fetchStudent(id) {    
        return function thunk(dispatch) {
            return axios.get(`/api/student/${id}`)
                .then(res => {
                    return res.data
                })
                .then(student => {
                    console.log('In fetchStudent: ', student);
                    const action = getStudent(student);
                    dispatch(action);
                });
        }
}

// Reducer
export default function singleStudent(state = {campus: {}}, action) {   
        switch (action.type) {
            case GET_STUDENT:
                return action.student
            default:
                return state;
        }    
}