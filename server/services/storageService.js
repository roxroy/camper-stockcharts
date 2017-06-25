let Stock = require('../models/stock');

function getStockData(symbol){
	return Stock.findOne({ symbol: symbol }).exec();
};

function getAllStocks(){
	return Stock.find({}).exec();
};

function remove(symbol) {
	if (symbol) {
		Stock.findOne({ symbol: symbol }, function(err, symbol) {
		  if (err) throw err;

		 	symbol.remove(function(err) {
		    if (err) throw err;
		  });
		});
	}
};


function addNew(stockData){
	let newStock = Stock({
	  symbol: stockData.symbol,
	  description: stockData.description,
	  trades: stockData.trades,
	});

	newStock.save(function(err, resource) {
	  if (err) throw err;
	  console.log('Stock created!', stockData.symbol);
	});
};

module.exports = {
  addNew,
  getStockData,
  getAllStocks,
  remove,
}
