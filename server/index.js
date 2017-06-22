const express = require('express');
const path = require('path');
const app = express();

let mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Connect mongoose to our local database
let dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/stockcharts';
mongoose.Promise = Promise;
mongoose.connect(dbUri);

app.use(express.static('./client/public'));

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
