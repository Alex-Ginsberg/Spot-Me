import axios from 'axios';
import {fetchCurrentStudents} from './currentStudents'

// Action Types
const GET_STUDENTS = 'GET_STUDENTS';
const NEW_STUDENT = 'NEW_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';

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
    return action;
}

export function removeStudents(studentId) {
    const action = {
        type: REMOVE_STUDENT,
        studentId: studentId
    }
    return action;
}

export function editStudents(students) {
    const action = {
        type: EDIT_STUDENT,
        students: students
    }
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

export function  postStudent(studentName, studentEmail, campusId) {
    return function thunk(dispatch) {
        return axios.post('/api/student', {
            name: studentName,
            email: studentEmail,
            campusId: campusId
        })
            .then(res => res.data)
            .then(newStudent => {
                axios.get(`/api/student/${newStudent.id}`)
                    .then(student => {
                        console.log(student)
                        const action = newStudents(student.data);
                        dispatch(action);
                    })
                    .then(() => {
                        console.log('in post student')
                        dispatch(fetchCurrentStudents(campusId));
                    })
                
            })
    }
}

export function deleteStudent(studentId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/student/${studentId}`)
            .then(() => {
                const action = removeStudents(studentId);
                dispatch(action);
            })
    }
}

export function putStudent(id, name, email, campus) {
    console.log('heeeeeerrrrreeeee');
    return function thunk(dispatch) {
        console.log('heeeeeerrrrreeeee');
        return axios.put(`/api/student/${id}`, 
        {
            name,
            email, 
            campusId: campus
        })
            .then(res => {
                console.log('RES>DATA: ', res.data)
                return res.data
            })
            .then(() => {
                axios.get(`/api/student`)
                    .then(res => res.data)
                    .then(campuses => {
                        console.log('IN PUT: ', campuses)
                        const action = editStudents(campuses)
                        dispatch(action);
                    })
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
            case REMOVE_STUDENT:
                let newState = state.filter((student) => student.id !== action.studentId);
                return newState;
            case EDIT_STUDENT:
                return action.students
            default:
                return state;
        }    
}