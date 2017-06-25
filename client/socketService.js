const utils = require("./utils");
let socketCommands = require("./socketCommands");

let wsUri = window.location.origin.replace(/^http/, 'ws');
let websocket = null;

function initialize() {
  websocket = new WebSocket(wsUri);
  websocket.onmessage = onMessage;
  websocket.onerror = onError;
  websocket.onclose = function (event) {
   // Connection closed.
   // Firstly, check the reason.  
   if (event.code != 1000) {
      if (!navigator.onLine) {
         utils.showToast("You are offline. Please connect to the Internet and try again.");
      }
   }
  }
}

function onMessage(event) {
  const message = JSON.parse(event.data);
  socketCommands.handle(message);
}

function onError(event) {
  utils.showToast(err);    
}

function sendCommand(command, stock) {
  const message = {
    command,
    stock, 
  };
  if (websocket.readyState === 1) {
    websocket.send(JSON.stringify(message));
  } else {
    utils.showToast('Refresh the page to connect to the server.');
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
