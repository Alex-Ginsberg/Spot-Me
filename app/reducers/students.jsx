import axios from 'axios';

// Action Types
const GET_STUDENTS = 'GET_STUDENTS';
const NEW_STUDENT = 'NEW_STUDENT';

// Action Creator
export function getStudents(students) {
    const action = {
        type: GET_STUDENTS,
        students: students
    };
    return action;
}

export function newStudents(student) {
    const action = {
        type: NEW_STUDENT,
        student: student
    };
    return action
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

export function  postStudent(studentName, campus) {
    return function thunk(dispatch) {
        console.log(studentName)
        return axios.post('/api/student', {
            name: studentName
        })
            .then(res => res.data)
            .then(newStudent => {
                const action = newStudents(newStudent);
                dispatch(action);
            })
    }
}

// Reducer
export default function students(state = [], action) {   
        switch (action.type) {
            case GET_STUDENTS:
                return action.students
            case NEW_STUDENT:
                return [...state, action.student]
            default:
                return state;
        }    
}