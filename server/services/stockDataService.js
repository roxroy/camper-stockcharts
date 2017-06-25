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
      trades = json.dataset.data.map( (item) =>{
        return [ new Date(item[0]).getTime(), item[1] ];
      });

  return { symbol, description, trades };
}

function saveData(json) {
  const parsedData = getParsedFields(json);
  storageService.addNew(parsedData);
  return parsedData;
}

function getData(stockParams) {
  return new Promise((resolve, reject) => {

    getApiData(stockParams)
      .then((json) =>  {
        if (json.quandl_error || !json.dataset.hasOwnProperty('dataset_code')) {
          reject('Invalid stock code.');
        } else {
          resolve(saveData(json));
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

module.exports = {
  getData
}
