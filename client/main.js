const formHandler = require("./formHandler");
const socketService = require("./socketService");
const chartingService = require("./chartingService");

$(document).ready(() => { 
	  socketService.initialize();
    formHandler.setHandlers();
});
