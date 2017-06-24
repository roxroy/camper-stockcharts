const https = require('https');

function getData(params) {
	return new Promise((resolve, reject) => {
	
		const path = `/api/v3/datasets/WIKI/${params.symbol}.json?start_date=${params.startDate}&end_date=${params.endDate}&order=asc`;
		const options = {
	    host: 'www.quandl.com',
	    path: path,
	    method: 'GET'
		};
		let	data ='';

		const request = https.request(options, (res) => {
			res.setEncoding('utf8');
		    res.on('data', (chunk) => {
	      		data += chunk;
		    });
		    res.on('end', () => resolve(JSON.parse(data)));
			});
		request.on('error', (err) => reject(err))
		request.end();
	});
}

function getParsedFields(json) {
	//console.log(json);
	console.log(json.dataset.dataset_code, json.dataset.dataset_code, json.dataset.data[0][0], json.dataset.data[0][1]);
}

function saveToDb() {
}

function process() {
	getData({symbol: 'AAPL', startDate : '2017-01-01', endDate : '2017-01-10'})
  .then((json) => getParsedFields(json))
  .catch((err) => console.error(err));
}

module.exports =  {
	process
}
