import axios from 'axios';

// Action Types
const GET_CAMPUSES = 'GET_CAMPUSES';
const NEW_CAMPUS = 'NEW_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'

// Action Creator
export function getCampuses(campuses) {
    const action = {
        type: GET_CAMPUSES,
        campuses: campuses
    };
    return action;
}

export function newCampuses(campus) {
    const action = {
        type: NEW_CAMPUS,
        campus: campus
    }
    return action;
}

export function removeCampuses(campusId) {
    const action = {
        type: REMOVE_CAMPUS,
        campusId: campusId
    }
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

export function  postCampus(campusName) {
    return function thunk(dispatch) {
        return axios.post('/api/campus', {
            name: campusName,
            image: '/images/mars.jpeg'
        })
            .then(res => res.data)
            .then(campus => {
                const action = newCampuses(campus);
                dispatch(action);
            })
    }
}

export function deleteCampuses(campusId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campus/${campusId}`)
            .then(() => {
                const action = removeCampuses(campusId);
                dispatch(action);
            })
    }
}

// Reducer
export default function campuses(state = [], action) {   
        switch (action.type) {
            case GET_CAMPUSES:
                return action.campuses
            case NEW_CAMPUS:
                return [...state, action.campus]
            case REMOVE_CAMPUS:
                let newState = state.filter((student) => student.id !== action.studentId);
                return newState;
            default:
                return state;
        }    
}