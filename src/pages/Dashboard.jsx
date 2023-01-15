import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import CoinRow from '../components/CoinRow'
import Searchbar from '../components/Searchbar'
import '../styles/Dashboard.css'

export default function Dashboard(props) {

  const { user } = props
  
  const [appUser, setAppUser] = useState(user); // user is an object with username and password
  const [watchlist, setWatchlist] = useState([
    {ticker: 'BTC', marketCap: '100B', balance: '5,777', price: 0.000038, sevenDay : '+5.1%', thirtyDay: '-27.4%', oneYear: '+1M%', TODAY: '+7.7%'}, 
    {ticker: 'ETH',  marketCap: '200B', balance: '5,777', price: 0.000038, sevenDay : '+5.1%', thirtyDay: '-27.4%', oneYear: '+1M%', TODAY: '+7.7%'}, 
    {ticker: 'ADA', marketCap: '300B', balance: '5,777', price: 0.000038, sevenDay : '+5.1%', thirtyDay: '-27.4%', oneYear: '+1M%', TODAY: '+7.7%'}])
  

  function handleDelete (ticker) {
    setWatchlist(watchlist.filter(coin => coin.ticker !== ticker))

    // request to update user's watchlist
    fetch('/dashboard', {
      method: 'PUT',
      body: JSON.stringify(watchlist),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .then(response => console.log('deleted ', ticker))
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
      <div className='header'>
        <table>
          <tr>
            <th>Name</th>
            <th>Marketcap</th>
            <th>Price</th>
            <th>Seven Day</th>
            <th>Thirty Day</th>
            <th>One Year</th>
            <th>Today Change</th>
          </tr>
        </table>
      </div>
      <div className="watchlist">
        {watchlist.map((coin, index) => {
          return <CoinRow handleDelete = {(ticker) => handleDelete(ticker)} ticker = {coin.ticker} coin={coin}/>
        })}
      </div>
      <div className="news-module">

      </div>
    </div>
  )
}