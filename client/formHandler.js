const socketService = require("./socketService");

function setHandlers() {
  $('#btn-add').on('click', () => {
    const $elm = $('#addStock');
    const stock = $elm.val();
    socketService.sendAddCommand(stock);
    $elm.val('');
  });

  $('#content-placeholder').on('click', '.stock-remove', (event) => {
    const stock = $(event.target).parent().closest('.card').data('stock');
    socketService.sendRemoveCommand(stock);
  });
}

module.exports = function() {
  return  {
    setHandlers,
  }
}();
