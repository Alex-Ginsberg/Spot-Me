import axios from 'axios';

// Action Types
const GET_STUDENTS = 'GET_STUDENTS';

// Action Creator
export function getStudents(students) {
    const action = {
        type: GET_STUDENTS,
        students: students
    };
    return action;
}

// Thunk Middleware
export function fetchStudents() {    
        return function thunk(dispatch) {
            return axios.get('/api/student')
                .then(res => res.data)
                .then(students => {
                    const action = getStudents(students);
                    dispatch(action);
                });
        }
}

// Reducer
export default function students(state = [], action) {   
        switch (action.type) {
            case GET_STUDENTS:
                return action.students
            default:
                return state;
        }    
}