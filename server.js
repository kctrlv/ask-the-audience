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

// run the server
server.listen(port, function() {
  console.log('Listening on port ' + port + '.')
})

// export the server so we can access it - public interface
// other modules which require this module will be able to access this object and use the functionality

module.exports = server;
