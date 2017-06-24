const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  symbol: String,
  description: String,
  tradeDates: {
    startDate : Date,
    endDate : Date
  },
  tradeHistory: [],
});

module.exports = mongoose.model('Stock', stockSchema);
