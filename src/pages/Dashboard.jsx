import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import CoinRow from '../components/CoinRow'
import '../styles/Dashboard.css'

export default function Dashboard() {

  const [watchlist, setWatchlist] = useState([{ticker: 'BTC'}, {ticker: 'ETH'}, {ticker: 'ADA'}])
  

  function handleDelete (ticker) {
    setWatchlist(watchlist.filter(coin => coin.ticker !== ticker))
  }



  return (
    <div className="Dashboard">
      <div className="head-module">
        <div className="head-module--info">

        </div>
        <div className="watchlist-input">
          <input type="text" placeholder='Ticker...' /> <button className='addticker-button'>Add</button>
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
