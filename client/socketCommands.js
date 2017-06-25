//import charting from './charting';

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
    default :
    break;
  }
}

function addStock(message) {
  let template = $('#stock-template').html();
  const context = { 
    stock: message.stock,
    description: message.command + '. More data',
  };

  template = Handlebars.compile(template);
  $("#content-placeholder").append(template(context));

  //charting.addStock(message);
}

function removeStock(message) {
  const $elem = $('.card[data-stock="' + message.stock + '"]');
  if ($elem) {
    $elem.parent().remove();
    //charting.removeStock(message.stock);

  }
}

module.exports = function() {
  return  {
    handle,
    addStock,
    removeStock,
  }
}();
