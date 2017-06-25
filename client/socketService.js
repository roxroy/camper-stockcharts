const socketCommands = require("./socketCommands");

let wsUri = window.location.origin.replace(/^http/, 'ws');
let websocket = null;

function initialize() {
  websocket = new WebSocket(wsUri);
  websocket.onmessage = onMessage;
}

function onMessage(event) {
  const message = JSON.parse(event.data);
  socketCommands.handle(message);
}

function sendCommand(command, stock) {
  const message = {
    command,
    stock,
  };

  if (websocket) {
    websocket.send(JSON.stringify(message));
  } else {
    console.log('Not connected');
  }
} 
 
function sendAddCommand(stock) {
  sendCommand('add', stock);
}

function sendRemoveCommand(stock) {
  sendCommand('remove', stock);
}

module.exports = function() {
  return  {
    initialize,
    sendAddCommand,
    sendRemoveCommand,
  }
}();
