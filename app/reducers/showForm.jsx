// Action Types
const SHOW_FORM = 'SHOW_FORM';

// Action Creator
export function showForm() {
    const action = {
        type: SHOW_FORM
    };
    return action;
}

// Reducer
export default function students(state = false, action) {   
        switch (action.type) {
            case SHOW_FORM:
                return !state
            default:
                return state;
        }    
}