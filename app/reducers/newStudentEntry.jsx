import axios from 'axios';

// Action Types
const WRITE_STUDENT = 'WRITE_STUDENT';

// Action Creator
export function writeStudent(currentStudentName) {
    const action = {
        type: WRITE_STUDENT,
        currentStudentName: currentStudentName
    };
    return action;
}

// Reducer
export default function writeReducer(state = '', action) {   
        switch (action.type) {
            case WRITE_STUDENT:
                console.log(action.currentStudentName)
                return action.currentStudentName;
            default:
                return state;
        }    
}