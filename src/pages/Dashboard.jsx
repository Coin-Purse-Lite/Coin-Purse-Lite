import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import CoinRow from '../components/CoinRow'
import Searchbar from '../components/Searchbar'
import '../styles/Dashboard.css'

export default function Dashboard(props) {
  
  const { user } = props
  
  const [appUser, setAppUser] = useState(user); // user is an object with username and password
  const [watchlist, setWatchlist] = useState([{ticker: 'BTC'}, {ticker: 'ETH'}, {ticker: 'ADA'}])
  

  function handleDelete (ticker) {
    setWatchlist(watchlist.filter(coin => coin.ticker !== ticker))
  }



  return (
    <div className="Dashboard">
      <div className="head-module">
        <div className="head-module--info">
          {appUser.username}
        </div>
        <div className="watchlist-input">
          <Searchbar watchlist = {watchlist} setWatchlist = {(ticker) => setWatchlist(ticker)} />
        </div>
      </div>
      <div className="price-chart">

      </div>
      <div className="watchlist">
        {watchlist.map((coin, index) => {
          return <CoinRow handleDelete = {(ticker) => handleDelete(ticker)} ticker = {coin.ticker} />
        })}
      </div>
      <div className="news-module">

      </div>
    </div>
  )
}
