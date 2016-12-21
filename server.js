// declare empty object to store votes
// key will be socket.id and the vote will be the value
var votes = {};

// require libraries
const http = require('http');
const express = require('express');
const _ = require('lodash');

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
  socket.userName = socket.id.substring(0, 4)
  console.log("Connected: " + socket.userName + ".", io.engine.clientsCount);
  // let's now emit an event to all users
  io.sockets.emit('usersConnected', io.engine.clientsCount);
  // this is how we emit the event to just the single client
  socket.emit('statusMessage', 'You have connected.');

  // a connection happens on io, a disconnect happens on an individual socket
  socket.on('disconnect', function() {
    console.log("Disconnected: " + socket.userName + ".", io.engine.clientsCount);
    // and let's emit after a user disconnects as well
    io.sockets.emit('usersConnected', io.engine.clientsCount);
    // and lets delete the user's vote if they leave
    delete votes[socket.userName];
    console.log(votes);
  });

  // every call to socket.send on client triggers message event on server
  socket.on('message', function(channel, message) {
    // console.log(channel, message);
    if (channel === 'voteCast') {
      votes[socket.userName] = message;
      console.log(votes);
      console.log(tallyVotes(votes));
      io.sockets.emit('voteCount', tallyVotes(votes));
    }
  });
})

function tallyVotes(votes) {
  return _.reduce(votes, function(result, vote, user) {
    result[vote] += 1;
    return result
  }, { 'A': 0, 'B': 0, 'C': 0, 'D': 0 });
}

// socket.emit emits to a single client
// io.sockets.emit emits to all connected clients

// run the server
server.listen(port, function() {
  console.log('Listening on port ' + port + '.')
})

// export the server so we can access it - public interface
// other modules which require this module will be able to access this object and use the functionality

module.exports = server;
