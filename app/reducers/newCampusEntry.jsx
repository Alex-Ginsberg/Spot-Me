import axios from 'axios';

// Action Types
const WRITE_CAMPUS = 'WRITE_CAMPUS';

// Action Creator
export function writeCampus(currentCampusName) {
    const action = {
        type: WRITE_CAMPUS,
        currentCampusName: currentCampusName
    };
    return action;
}

// Reducer
export default function writeCampusReducer(state = '', action) {   
        switch (action.type) {
            case WRITE_CAMPUS:
                return action.currentCampusName;
            default:
                return state;
        }    
}