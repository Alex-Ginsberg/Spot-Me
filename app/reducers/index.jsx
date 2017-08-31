import { combineReducers } from 'redux'
import userReducer from './userReducer'


const initialState = {}


const rootReducer = combineReducers({
    userReducer
})

export default rootReducer
