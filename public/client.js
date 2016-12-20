// instantiate websocket connection from the client
var socket = io();

// now there is a websocket connection between the browser and node
// when connecting, a connection event was fired on the server
// right now, nothing is listening for it, so it's useless
// next step: set up an event listener on the server for the connection event

// ...

// listen for the server event to all users and update the html
socket.on('usersConnected', pageUpdateCount )

function pageUpdateCount(count) {
  document.getElementById('connection-count').innerText = "Connected Users: " + count;
}

// listen for the server event to me about my status
socket.on('statusMessage', pageUpdateStatus)

function pageUpdateStatus(message) {
  document.getElementById('status-message').innerText = message
}

// right now client is listening for the server events and updating the page
// lets have the client send events to the server

// first we should add event listeners to all the buttons
var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  // buttons[i].addEventListener('click', function() {
  //   console.log(this.innerText);
  // });

  buttons[i].addEventListener('click', consoleLogInnerText );

  function consoleLogInnerText() {
    console.log(this.innerText);
  }

}
