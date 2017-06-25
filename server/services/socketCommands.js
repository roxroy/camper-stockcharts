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

function startupMessage (connection) {
/*
	seriesOptions[i] = {
            name: name,
            data: data
        };
*/
	var seriesOptions = [
		{
			name : "APPL",
			data :  [[1277683200000,30], [1278683200000,23], [1279683200000,31], [1280683200000,26] ],
		},
		{
			name : "GOOG",
			data :  [[1277683200000,50], [1278683200000,43], [1279683200000,51], [1280683200000,56] ],
		},
	];
	let message = {
		command : 'start',
		data: seriesOptions,
	}
	if (connection) {
      connection.send(JSON.stringify(message));
	}
};

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
		case 'start': {
			startupMessage(ws);
			break;
		}
	}
}

module.exports = {
 	handle
}
