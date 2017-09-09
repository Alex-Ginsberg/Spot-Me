import React, { Component } from 'react';
import store from '../store'
import {fetchMessages} from '../reducers/messages'
import NewMessageEntry from './NewMessageEntry'
import Jukebox from './Jukebox'
import {fetchSinglePlaylist} from '../reducers/singlePlaylist'
import {fetchFriends} from '../reducers/currentFriends'
import axios from 'axios'

export default class SingleChat extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.addToChat = this.addToChat.bind(this);
    }

    componentDidMount() {
        const messagesThunk = fetchMessages();
        store.dispatch(messagesThunk);
        const singlePlaylistThunk = fetchSinglePlaylist(Number(this.props.match.params.id));
        store.dispatch(singlePlaylistThunk);
        const friendsThunk = fetchFriends(this.state.userReducer.id)
        store.dispatch(friendsThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
      this.unsubscribe();
    }

    addToChat(e) {
        e.preventDefault();
        const chatId = Number(this.props.match.params.id);
        axios.post('/api/users/members', {userId: e.target.friendChoice.value, playlistId: chatId})
    }

    render() {
        const chatId = Number(this.props.match.params.id);
        let playlist;
        for (var i = 0; i < this.state.chats.length; i++) {
            if (this.state.chats[i].id === chatId){
                playlist = this.state.chats[i]
            }

        }
        const filteredMessages = this.state.messages.filter(message => message.playlistId === chatId);

        return(
            <div>
                <form onSubmit={(this.addToChat)}>
                <h1>{this.state.singlePlaylist.name}</h1>
                <select className="form-control" name="friendChoice" required>
                    <option value="" defaultValue>Select a friend to add to chat</option>
                    {
                        this.state.currentFriends.map(friend => (
                        <option key={friend.id} value={friend.id}>{friend.name}</option>
                    ))
                    }
                </select>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Add to Group</button>
                </div>
                </form>
            <div className="row">
                <div className="col-lg-6">
                    <ul id="messageList">
                        {filteredMessages.map(message => (
                            <li key={message.id}>{message.body}</li>
                        ))}
                    </ul>
                    <NewMessageEntry currentChat={chatId}/>
                </div>
                <div className="col-lg-6">
                    <Jukebox currentChat={chatId} playlist={playlist}/>
                </div>
            </div>
            </div>
        )
    }
}