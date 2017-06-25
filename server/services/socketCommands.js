const stockDataService = require('./stockDataService');
const storageService = require('./storageService');

function getStockData(message) {
  const stockParams = { symbol: message.stock, startDate: '2017-01-01', endDate: '2017-01-10' };
  // if stock in db then get it
  // otherwise  got to api
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
        reject('');
      }
    });
  });
/*

    if (tradeData && tradeData.symbol) {
        return new Promise(function(resolve, reject) {  
          storageService.getStockData(message.stock)
          .then(function(stockdata) {
            resolve(stockdata);
          });
        });
    } else {
        return new Promise(function(resolve, reject) {  
          stockDataService.getData(stockParams)
          .then(function(stockdata) {
            resolve(stockdata);
          });
        });
    }
 */ 
}

function startupMessage (connection) {
  var seriesOptions = [
    {
      name : "APPL1",
      data :  [[1277683200000.0,30], [1278683200000.0,23], [1279683200000,31], [1280683200000,26] ],
    },
    {
      name : "GOOG1",
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
      .then(function(data) {
        const _message = message;
        _message.data = data.tradeHistory;
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
      startupMessage(ws);
      break;
    }
  }
}

module.exports = {
  handle
}
