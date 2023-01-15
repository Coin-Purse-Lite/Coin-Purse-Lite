import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import CoinRow from '../components/CoinRow'
import Searchbar from '../components/Searchbar'
import SearchList from '../components/SearchList'
import '../styles/Dashboard.css'

export default function Dashboard(props) {

  const { user } = props
  ////-------SEARCH FUNCTIONALITY ADDED TODAY---------//////
  // string captured from the search bar that is sent to the server
  const [searchTerm, setSearchTerm] = useState('');
  // array received from server containing detailed coin information
  const [coinData, setCoinData] = useState([]);
  
  const [appUser, setAppUser] = useState(user); // user is an object with username and password
  // array of ticker symbols to be sent to backend
  const [dashList, setDashList] = useState([{ticker: 'BTC'}, {ticker: 'ETH'}, {ticker: 'ADA'}]);
  // array of ticker details received from backend
  const [watchlist, setWatchlist] = useState() 

  // event handler that deletes a ticker row from the dashboard
  function handleDelete (ticker) {
    // removes ticker details from dashList 
    setDashList(dashList.filter(coinObject => coinObject.symbol !== ticker));
    // removes ticker from watchlist
    setWatchlist(watchlist.filter(coin => coin.ticker !== ticker));

    // request to update user's watchlist
    fetch('http://localhost:3001/dashboard', {
      method: 'PUT',
      body: JSON.stringify({
        ticker: ticker,
        watchlist: watchlist,
        username: appUser.username
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .then(response => console.log('deleted ', ticker)) // consider making popup confirming deletion
  }

  ////-------SEARCH FUNCTIONALITY ADDED TODAY---------//////
  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const url = `https://api.coincap.io/v2/assets?search=${searchTerm}`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          setCoinData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [searchTerm]);

  return (
    <div className="Dashboard">
      <div className="head-module">
        <div className="head-module--info">
          {appUser.username}
        </div>
        <div className="watchlist-input">
          {/* <Searchbar watchlist = {watchlist} setWatchlist = {(ticker) => setWatchlist(ticker)} dashList = {dashList} setDashList = {(ticker) => setWatchlist(ticker)}/> */}
          <Searchbar onSearch={handleSearch}/>
          <SearchList coinData={coinData}/>
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
        {dashList.map((coin, index) => {
          return <CoinRow handleDelete = {(ticker) => handleDelete(ticker)} ticker = {coin.ticker} coin={coin}/>
        })}
      </div>
      <div className="news-module">

      </div>
    </div>
  )
}