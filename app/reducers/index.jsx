import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'
import currentCampus from './currentCampus'
import currentStudents from './currentStudents'
import newStudentEntry from './newStudentEntry'

const initialState = {}


const rootReducer = combineReducers({
  campuses,
  students,
  currentCampus, 
  currentStudents,
  newStudentEntry
})

export default rootReducer
