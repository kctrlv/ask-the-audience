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

// listen for the total votecount event
socket.on('voteCount', pageUpdateVoteCount )
function pageUpdateVoteCount(voteCount) {
  // console.log('here are the votes: ')
  // console.log(votes);
  document.getElementById('votes-tally-a').innerText = 'A: ' + voteCount['A']
  document.getElementById('votes-tally-b').innerText = 'B: ' + voteCount['B']
  document.getElementById('votes-tally-c').innerText = 'C: ' + voteCount['C']
  document.getElementById('votes-tally-d').innerText = 'D: ' + voteCount['D']
}

socket.on('userSpeak', pageAppendUserChat )
function pageAppendUserChat([user, message]) {
  document.getElementById('chatbox').innerText = user + ': ' + message
}




// right now client is listening for the server events and updating the page
// lets have the client send events to the server

// first we should add event listeners to all the buttons
var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', socketSendVoteCast );

  function socketSendVoteCast() {
    socket.send('voteCast', this.innerText);
  }
}

// add listener for chat field
document.getElementById('chat').addEventListener('keypress', socketSendChat)

function socketSendChat(event) {
  if (event.keyCode == 13) {
    if (event.target.value) {
      socket.send('chat', event.target.value)
    }
    event.target.value = ''
    event.preventDefault()
  }
}




// $(document).on "keypress", '[data-behavior~=lobby_speaker]', (event) ->
//   if event.keyCode is 13
//     if event.target.value
//       App.lobby.speak event.target.value
//     event.target.value = ''
//     event.preventDefault()
//
