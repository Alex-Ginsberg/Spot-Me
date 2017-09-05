import io from 'socket.io-client';
import store from './store';
import {getMessage} from './reducers/messages'
import {newSong, newLike} from './reducers/songs'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
  });

  socket.on('new-song', (song) => {
    store.dispatch(newSong(song));
  })

  socket.on('new-like', (songs) => {
    store.dispatch(newLike(songs))
  })

});

export default socket;
