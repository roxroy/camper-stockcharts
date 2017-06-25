const stockDataService = require('./stockDataService');

function getStockData(message) {
  const stockParams = { symbol:message.stock, startDate: '2017-01-01', endDate: '2017-01-10' };

  return new Promise(function(resolve, reject) {  
  	stockDataService.getData(stockParams)
		.then(function(stockdata) {
			//message.history = stockdata.history;
			//message.color = stockdata.color;
			//message.details = stockdata.details;
	    resolve(stockdata);
		});
  });
}

function broadcastMessage (connections, message) {
	// rebroadcast command to all clients
	if (connections) {
			connections.forEach(function(destination) {
			        destination.send(JSON.stringify(message));
		  });
	}
};

function handle (ws, connections, message) {
	switch(message.command) {
		case 'add': {
			getStockData(message)
			.then(function(_message) {
					console.log*(message);
					broadcastMessage(connections, _message);
			}); 
			break;
		}
		case 'remove': {
			broadcastMessage(connections, message);
			break;
		}
	}
}

module.exports = {
 	handle
}
