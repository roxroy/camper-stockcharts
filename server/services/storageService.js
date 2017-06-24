let Stock = require('../models/stock');

function addNew(stockData){
	let newStcok = Stock({
	  symbol: stockData.symbol,
	  description: stockData.description,
	  tradeDates: stockData.tradeDates,
	  tradeHistory: stockData.tradeHistory,
	});

	newStcok.save(function(err, resource) {
	  if (err) throw err;
	  console.log('Stock created!', stockData.symbol);
	});
};

module.exports = {
  addNew
}
