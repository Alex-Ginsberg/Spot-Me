import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'
import currentCampus from './currentCampus'
import currentStudents from './currentStudents'

const initialState = {}


const rootReducer = combineReducers({
  campuses,
  students,
  currentCampus, 
  currentStudents
})

export default rootReducer
