const chartingService = require("./chartingService");

let seriesData = [];

function handle(message) {
  switch (message.command) {
    case 'add': {
      console.log('UI add handle:', message);
      addStock(message);
      break;
    }
    case 'remove': {
      console.log('UI remove handle:', message);
      removeStock(message);
      break;
    }
    case 'start': {
      seriesData = message.data;
      addAllStocks();
      break;
    }
    default :
    break;
  }
}

function addAllStocks() {
  $.each(seriesData, function (i, item) {
    console.log('Item:', item);
    addStockCard({stock: item.name, command: ''});
  });
  chartingService.createChart(seriesData);
}

function addStockCard(message) {
  let template = $('#stock-template').html();
  const context = { 
    stock: message.stock,
    description: message.command + '. More data',
  };

  template = Handlebars.compile(template);
  $("#content-placeholder").append(template(context));
}

function addStock(message) {
  addStockCard(message);
  seriesData.push({ name: message.stock, data: message.data });
  chartingService.createChart(seriesData);
}

function removeStock(message) {
  const $elem = $('.card[data-stock="' + message.stock + '"]');
  if ($elem) {
    $elem.parent().remove();
    const index = seriesData.findIndex(function(item){
      return item.name === message.stock;
    });
    if (index > -1) {
      seriesData.splice(index, 1);
    }
    chartingService.createChart(seriesData);
  }
}

module.exports = function() {
  return  {
    handle,
    addStock,
    removeStock,
  }
}();
