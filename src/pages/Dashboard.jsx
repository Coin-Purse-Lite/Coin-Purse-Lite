import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import CoinDisplay from '../components/CoinDisplay'
import CoinRow from '../components/CoinRow'
import Searchbar from '../components/Searchbar'
import SearchList from '../components/SearchList'
import HeadModule from '../components/HeadModule'
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
  const [dashList, setDashList] = useState([]);
  // array of ticker details received from backend
  const [watchlist, setWatchlist] = useState([{ticker: 'BTC'}, {ticker: 'ETH'}, {ticker: 'ADA'}]) 


  // event handler that deletes a ticker row from the dashboard
  function handleDelete (ticker) {
    // removes ticker details from dashList 
    setDashList(dashList.filter(coinObject => coinObject.symbol !== ticker));
    // removes ticker from watchlist
    setWatchlist(watchlist.filter(coin => coin.symbol !== ticker));

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

  const handleAdd = (coin) => { // fix input, NOT TARGET!!!
    console.log('invoking handleAdd on search');
    console.log('tickerName is ', coin);
    console.log('dashList is ', dashList);

    setDashList([...dashList, coin]);
    console.log('dashList is this after add', dashList);
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
      <HeadModule
      handleSearch = {handleSearch}
      coinData = {coinData}
      dashList = {dashList}
      watchList = {watchlist}
      handleAdd = {handleAdd}  />
      </div>
      {/* <div className="head-module">
        {/* <h1>Head Module</h1> */}
        {/* <div className="head-module--info">
          {appUser.username}
        </div> 
        <div className="watchlist-input">
          <Searchbar onSearch={handleSearch}/>
          <SearchList coinData={coinData} dashList={dashList} watchlist={watchlist} handleAdd={handleAdd}/>
        </div>
      </div> */}
      <div className="price-chart">
        <h1>Price Chart</h1>
      </div>
      
      <div className="watchlist">
        {/* <h1>Watchlist</h1> */}

        <CoinDisplay 
        dashList = {dashList} 
        handleDelete = {handleDelete}
        searchTerm = {searchTerm}
        setCoinData = {setCoinData} />

      </div>
      <div className="news-module">
        <h1>News module</h1>
      </div>
    </div>
  )
}