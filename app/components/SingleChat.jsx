import React, { Component } from 'react';
import store from '../store'
import {fetchMessages} from '../reducers/messages'
import NewMessageEntry from './NewMessageEntry'
import Jukebox from './Jukebox'
import {fetchSinglePlaylist} from '../reducers/singlePlaylist'

export default class SingleChat extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {
        const messagesThunk = fetchMessages();
        store.dispatch(messagesThunk);
        const singlePlaylistThunk = fetchSinglePlaylist(Number(this.props.match.params.id));
        store.dispatch(singlePlaylistThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
      this.unsubscribe();
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
                <h1>{this.state.singlePlaylist.name}</h1>
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