# Camper Stock Charts
Web application to visualize stock market prices within a specific time period.

## User Story
Here are the specific user stories implemented for this project:

1. I can view a graph displaying the recent trend lines for each added stock.
1. I can add new stocks by their symbol name.
1. I can remove stocks.
1. I can see changes in real-time when any other user adds or removes a stock. For this you will need to use Web Sockets.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install to run the app:

- Node
- MongoDB

### Installing

Get the repository

```
git clone https://github.com/roxroy/camper-stockcharts.git
cd camper-stockcharts
npm install
```

Make a copy of `env.example` as `.env`
```
cp env.example .env
```

In a new terminal, go to the project folder, create a data folder and start mongo
```
mkdir data
mongod --dbpath=./data
```

In a new terminal, go to the project folder (folder with server.js) and run the following:
```
npm run start
```

Access the app through the browser, http://localhost:3000.


## Deployment

Release build is optimized for deployment to Heroku and MLab. Don't forget to set environment variables on Heroku from .env.

## Built With

* [MongoDB](https://www.mongodb.com/) - NoSQL database
* [Express.js](https://expressjs.com/) - Web application framework
* [Node.js](https://nodejs.org/en/) - Platform for network applications
* [WebSocket API](https://www.w3.org/TR/websockets/) - Interactive communication session between the user's browser and a server.

## Contributing

Please open any issues that you encounter on [the GitHub repo issue page](https://github.com/roxroy/camper-stockcharts/issues).

## Authors

* **Roxroy** - [roxroy](https://github.com/roxroy)


## Acknowledgments

* Hat tip to anyone who's code was used
* [Readme template used](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

