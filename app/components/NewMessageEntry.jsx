import React, { Component } from 'react';
import store from '../store';
import {writeMessage} from '../reducers/newMessageEntry'
import {postMessage} from '../reducers/messages'

export default class NewMessageEntry extends Component {

  constructor (props) {
    super(props);
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange (evt) {
    store.dispatch(writeMessage(evt.target.value))
  }

  handleSubmit (evt) {
    evt.preventDefault();
    console.log('USER: ', this.state.userReducer.id)
    const userId = this.state.userReducer.id;
    const content = '' + this.state.userReducer.name + "- " + this.state.newMessageEntry;
    const playlistId = this.props.currentChat;

    store.dispatch(postMessage({ userId, content, playlistId }));
    store.dispatch(writeMessage(''));
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Send a message..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Send</button>
          </span>
        </div>
      </form>
    );
  }
}
