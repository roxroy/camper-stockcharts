const https = require('https');
const storageService = require('./storageService');

function getData(params) {
  return new Promise((resolve, reject) => {

    const path = `/api/v3/datasets/WIKI/${params.symbol}.json?\
    start_date=${params.startDate}&end_date=${params.endDate}&order=asc`;
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
  const symbol = json.dataset.dataset_code,
      description = json.dataset.name,
      tradeDates: {
        startDate : json.dataset.start_date,
        endDate : json.dataset.end_date,
      },
      tradeHistory = json.dataset.data.map( (item) =>{
        return { date: item[0], open: item[1]};
      });
  return { symbol, description, tradeDates, tradeHistory };
}

function saveData(json) {
  storageService.addNew(getParsedFields(json));
}

function process() {
  getData({symbol: 'AAPL', startDate: '2017-01-01', endDate: '2017-01-10'})
    .then((json) =>  saveData(json))
    .catch((err) => console.error(err));
}

module.exports = {
  process
}
