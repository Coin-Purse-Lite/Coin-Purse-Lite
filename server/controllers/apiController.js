const User = require('../models/UserModel');
const axios = require('axios');

const apiController = {};

//gets data from api, compares user watchlist to that data, and keeps data relevant to user watchlist to send to front end

const pretend = [
  {
    "id": "bitcoin",
    "rank": "1",
    "symbol": "BTC",
    "name": "Bitcoin",
    "supply": "17193925.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "119150835874.4699281625807300",
    "volumeUsd24Hr": "2927959461.1750323310959460",
    "priceUsd": "6929.8217756835584756",
    "changePercent24Hr": "-0.8101417214350335",
    "vwap24Hr": "7175.0663247679233209"
  },
  {
    "id": "ethereum",
    "rank": "2",
    "symbol": "ETH",
    "name": "Ethereum",
    "supply": "101160540.0000000000000000",
    "maxSupply": null,
    "marketCapUsd": "40967739219.6612727047843840",
    "volumeUsd24Hr": "1026669440.6451482672850841",
    "priceUsd": "404.9774667045200896",
    "changePercent24Hr": "-0.0999626159535347",
    "vwap24Hr": "415.3288028454417241"
  },
  {
    "id": "ripple",
    "rank": "3",
    "symbol": "XRP",
    "name": "XRP",
    "supply": "39299874590.0000000000000000",
    "maxSupply": "100000000000.0000000000000000",
    "marketCapUsd": "16517228249.2902868380922380",
    "volumeUsd24Hr": "149328134.5032677889393019",
    "priceUsd": "0.4202870472643482",
    "changePercent24Hr": "-1.9518258685302665",
    "vwap24Hr": "0.4318239230821224"
  },
  {
    "id": "bitcoin-cash",
    "rank": "4",
    "symbol": "BCH",
    "name": "Bitcoin Cash",
    "supply": "17278438.0000000000000000",
    "maxSupply": "21000000.0000000000000000",
    "marketCapUsd": "11902454455.1536127997298894",
    "volumeUsd24Hr": "287075418.5202079328968427",
    "priceUsd": "688.8617162705108413",
    "changePercent24Hr": "-1.5016094894459434",
    "vwap24Hr": "711.6276356693412774"
  },
  {
    "id": "eos",
    "rank": "5",
    "symbol": "EOS",
    "name": "EOS",
    "supply": "906245118.0000000000000000",
    "maxSupply": "1000000000.0000000000000000",
    "marketCapUsd": "6327688685.5053582732768780",
    "volumeUsd24Hr": "373717579.0872289136334689",
    "priceUsd": "6.9823147841833210",
    "changePercent24Hr": "-0.2487845516123365",
    "vwap24Hr": "7.0345139617072947"
  }
]







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