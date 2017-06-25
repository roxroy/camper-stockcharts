const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  symbol: String,
  description: String,
  trades: [],
});

module.exports = mongoose.model('Stock', stockSchema);
