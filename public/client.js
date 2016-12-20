// instantiate websocket connection from the client
var socket = io();

// now there is a websocket connection between the browser and node
// when connecting, a connection event was fired on the server
// right now, nothing is listening for it, so it's useless
// next step: set up an event listener on the server for the connection event

// ...

// listen for server events and update the html
socket.on('usersConnected', pageUpdateCount )

function pageUpdateCount(count) {
  document.getElementById('connection-count').innerText = "Connected Users: " + count;
}
