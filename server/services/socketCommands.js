const stockDataService = require('./stockDataService');
const storageService = require('./storageService');

function getStockData(message) {
  const now = new Date(),
    endDate = now.toISOString().substring(0, 10),
    startDate = new Date(now.setFullYear( now.getFullYear() - 5 )).toISOString().substring(0, 10);
  
  const stockParams = { symbol: message.stock, startDate, endDate};

  return new Promise(function(resolve, reject) {  
    storageService.getStockData(message.stock)
    .then(function(tradeData) {
     if (tradeData && tradeData.symbol) {
          resolve(tradeData);
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
  if (connections && connections.length>0) {
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
        _message.stock = _message.stock.toUpperCase();
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
      storageService.remove(message.stock);
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
