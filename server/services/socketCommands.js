const stockDataService = require('./stockDataService');
const storageService = require('./storageService');

function getStockData(message) {
  const stockParams = { symbol: message.stock, startDate: '2017-05-01', endDate: '2017-06-25' };

  return new Promise(function(resolve, reject) {  
    storageService.getDateRange(message.stock)
    .then(function(tradeData) {
     if (tradeData && tradeData.symbol) {
        storageService.getStockData(message.stock)
        .then(function(tradeData) {
          resolve(tradeData);
        })
       .catch((err) => {
          console.error(err);
          reject(err);
        });        
      } else {
        stockDataService.getData(stockParams)
        .then(function(stockdata) {
           resolve(stockdata);
        });
      }
    });
  });
}

function startupMessage (connection, stocks) {

  let message = {
    command : 'start',
    data: stocks,
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
      .then(function(data) {
        const _message = message;
        _message.data = data.trades;
        _message.description = data.description;
        console.log*(_message);
        broadcastMessage(connections, _message);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      }); 
      break;
    }
    case 'remove': {
      broadcastMessage(connections, message);
      break;
    }
    case 'start': {
      storageService.getAllStocks()
      .then(function(stocks) {
        startupMessage(ws, stocks);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
      break;
    }
  }
}

module.exports = {
  handle
}
