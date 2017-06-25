const https = require('https');
const storageService = require('./storageService');

function getApiData(params) {
  return new Promise((resolve, reject) => {

    const path = `/api/v3/datasets/WIKI/${params.symbol}.json?start_date=${params.startDate}&end_date=${params.endDate}&order=asc`;
    const options = {
      host: 'www.quandl.com',
      path: path,
      method: 'GET',
    };
    let data = '';

    const request = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
          data += chunk;
      });
      res.on('end', () => resolve(JSON.parse(data)));
    });
    request.on('error', (err) => reject(err));
    request.end();
  });
}

function getParsedFields(json) {
  let history = [];
  const symbol = json.dataset.dataset_code,
      description = json.dataset.name,
      tradeDates = {
        startDate : json.dataset.start_date,
        endDate : json.dataset.end_date,
      },
      tradeHistory = json.dataset.data.map( (item) =>{
        return [ new Date(item[0]).getTime(), item[1] ];
      });

  return { symbol, description, tradeDates, tradeHistory };
}

function saveData(json) {
  const parsedData = getParsedFields(json);
  storageService.addNew(parsedData);
  return parsedData;
}

function adjustDates(stockParams) {
  // get the date for the stock. If endDate < stockEndDate => start=stockEnd,end(remain the same) 
  storageService.getDateRange(stockParams.symbol)
  .then(function(dates) {
    console.log('getDateRange: ', dates);
    const newStart = dates.tradeDates.endDate;
    const newEnd = stockParams.endDate;
  });
}

function getData(stockParams) {
  return new Promise((resolve, reject) => {

    getApiData(stockParams)
      .then((json) =>  {
        resolve(saveData(json));
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

function process(options) {
  const stockParams = { symbol: options.symbol, startDate: '2017-01-01', endDate: '2017-01-10' };
}

module.exports = {
  getData
}
