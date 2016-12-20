// require libraries
const http = require('http');
const express = require('express');

// instantiate express
const app = express();

// serve public directory
app.use(express.static('public'));

// route root to index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

// app needs to be passed to http module to produce a server
var server = http.createServer(app);

// pass a port set in env vars || fallback port
var port = process.env.PORT || 3000;

// set up Socket.io
const socketIo = require('socket.io')
const io = socketIo(server);

//   event listener for connection event
// io.on('connection', function(socket) {
//   console.log('A user has connected.');
// });

// a socket object is a connection to to a specific user's browser
// the io object can also get a count of all currently connected clients
io.on('connection', function(socket) {
  console.log("A user has connected.", io.engine.clientsCount);
  // let's now emit an event to all users
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  // a connection happens on io, a disconnect happens on an individual socket
  socket.on('disconnect', function() {
    console.log("A user has disconnected.", io.engine.clientsCount);
    // and let's emit after a user disconnects as well
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
})

// we're emitting events but nobody is listening
// next step is to set up listeners for the events on the client side

// run the server
server.listen(port, function() {
  console.log('Listening on port ' + port + '.')
})

// export the server so we can access it - public interface
// other modules which require this module will be able to access this object and use the functionality

module.exports = server;
