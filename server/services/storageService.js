let Stock = require('../models/stock');

function getDateRange(symbol){
	return Stock.findOne({ symbol: symbol }, 'symbol tradeDates').exec();
};

function getStockData(symbol){
};

function addNew(stockData){
	let newStock = Stock({
	  symbol: stockData.symbol,
	  description: stockData.description,
	  tradeDates: stockData.tradeDates,
	  tradeHistory: stockData.tradeHistory,
	});

	newStock.save(function(err, resource) {
	  if (err) throw err;
	  console.log('Stock created!', stockData.symbol);
	});
};

module.exports = {
  addNew,
  getDateRange,
}
