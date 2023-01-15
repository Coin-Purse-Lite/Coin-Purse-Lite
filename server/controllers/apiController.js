const User = require('../models/UserModel');
const axios = require('axios');

const apiController = {};

//gets data from api, compares user watchlist to that data, and keeps data relevant to user watchlist to send to front end
apiController.getUserApiData = (req, res, next) => {
    console.log(res.locals.user);
    const userWatchlist = res.locals.user.watchlist;
    const coinInfo = [];

    axios('http://api.coincap.io/v2/assets')
    .then(res => {
        console.log(res.data);
        userWatchlist.forEach((ticker) => {
          const coinData = res.data.find(coinData => coinData.symbol === ticker.toUpperCase());
        })

    })

    next();
}





module.exports = apiController;