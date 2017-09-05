import { combineReducers } from 'redux'
import userReducer from './userReducer'
import messages from './messages'
import newMessageEntry from './newMessageEntry'
import chats from './chats'
import songs from './songs'
import singlePlaylist from './singlePlaylist'


const initialState = {}


const rootReducer = combineReducers({
    userReducer,
    messages,
    newMessageEntry,
    chats,
    songs,
    singlePlaylist
})

export default rootReducer
