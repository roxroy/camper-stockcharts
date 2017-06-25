const WebSocketServer = require('ws').Server;
const socketCommands = require('./services/socketCommands').handle;

let connections = [];
let wss = null;
let clientId = 0;

function initialize(server){
	wss = new WebSocketServer(server);

	console.log('Initializing WebSocketServer....');

	wss.on('connection', function connection(ws) {

		var thisId = ++clientId;
		console.log('Client #%d connected', thisId);
		connections.push(ws);

		ws.on('message', function incoming(messageStr) {
			var message = JSON.parse(messageStr);
			socketCommands(ws, connections, message);
		});
	});
} 

module.exports = {
    initialize
};
