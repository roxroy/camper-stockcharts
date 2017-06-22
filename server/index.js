const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Connect mongoose to our local database
const dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/stockcharts';
mongoose.Promise = Promise;
mongoose.connect(dbUri);

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.get('/', routes.index);
app.get('/about', routes.about);

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('pages/error', {
		message: err.message,
		error: err,
		title : "Something when wrong"
	});
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
