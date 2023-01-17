const User = require('../models/UserModel');
const axios = require('axios');

const apiController = {};

//gets data from api, compares user watchlist to that data, and keeps data relevant to user watchlist to send to front end
apiController.getUserApiData = (req, res, next) => {
    const userWatchlist = [...res.locals.user.watchlist];
    // console.log('res.locals.user.wL is ', userWatchlist)

    //fetch the api, and compare each of our tickers, to each of the api's tickers (they only have 100 coins). If they match, give us the info in an array of objs to send to the front end
      //NOTE: currently both next() calls must be inside of async fetch calls, so that when we reference the data in res.locals at the route in the server, the info is guaranteed to be there when we send the info back to the client
    axios('http://api.coincap.io/v2/assets')
    .then(response => {
      res.locals.coinInfo = [];
        userWatchlist.forEach((ticker) => {
          for(let i = 0; i < response.data.data.length; i++){
            if(ticker === response.data.data[i].symbol){
              res.locals.coinInfo.push(response.data.data[i]);
            }
          }
        })
        next();
    })
    .catch(err => {
      return next({
        error: err
      })
    })
}





module.exports = apiController;