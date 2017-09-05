// const Message = require('../db/models/message');
// const Channel = require('../db/models/channel');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('new-song', song => {
      socket.broadcast.emit('new-song', song);
    });

    socket.on('new-like', songs => {
      socket.broadcast.emit('new-like', songs)
    })

  });

};
