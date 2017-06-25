const formHandler = require("./formHandler");
const socketService = require("./socketService");

$(document).ready(() => { 
	  socketService.initialize();
    formHandler.setHandlers();
});
