import { combineReducers } from 'redux'
import userReducer from './userReducer'
import messages from './messages'
import newMessageEntry from './newMessageEntry'
import chats from './chats'
import songs from './songs'
import singlePlaylist from './singlePlaylist'
import currentFriends from './currentFriends'
import users from './users'


const initialState = {}


const rootReducer = combineReducers({
    userReducer,
    messages,
    newMessageEntry,
    chats,
    songs,
    singlePlaylist,
    currentFriends,
    users
})

export default rootReducer
