const socketService = require("./socketService");

function setHandlers() {
  $('#btn-add').on('click', () => {
    const stock = $('#addStock').val();
    console.log(' formHandler addStock');
    socketService.sendAddCommand(stock);
  });

  $('#content-placeholder').on('click', '.stock-remove', (event) => {
    const stock = $(event.target).parent().closest('.card').data('stock');
    console.log(' formHandler removeStock ' + stock);
    socketService.sendRemoveCommand(stock);
  });
}

module.exports = function() {
  return  {
    setHandlers,
  }
}();
