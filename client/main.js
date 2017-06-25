import formHandler from './formHandler';
import socketService from './socketService';

$(document).ready(() => { 
	  socketService.initialize();
    formHandler();
});
