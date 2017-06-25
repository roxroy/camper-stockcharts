import socketCommands from './socketCommands';

export default function() {
  $('#btn-add').on('click', () => {
    const stock = $('#addStock').val();
    console.log(' formHandler addStock');
    socketCommands.sendAddCommand(stock);
  });

  $('#content-placeholder').on('click', '.stock-remove', (event) => {
    const stock = $(event.target).parent().closest('.card').data('stock');
    console.log(' formHandler removeStock ' + stock);
    socketCommands.sendRemoveCommand(stock);
  });
}
