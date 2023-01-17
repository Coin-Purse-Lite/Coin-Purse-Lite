import React, { useState, useEffect }  from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import CoinDisplay from '../components/CoinDisplay'
import CoinRow from '../components/CoinRow'
import Searchbar from '../components/Searchbar'
import SearchList from '../components/SearchList'
import HeadModule from '../components/HeadModule'
import PriceChart from '../components/PriceChart'
import '../styles/Dashboard.css'

export default function Dashboard(props) {



  const { user } = props

  const [searchTerm, setSearchTerm] = useState('');   // string captured from the search bar that is sent to the server
  const [coinData, setCoinData] = useState([]);   // array received from server containing detailed coin information
  const [appUser, setAppUser] = useState(user); // user is an object with username and password
  const [dashList, setDashList] = useState([]);  // array of ticker symbols to be sent to backend
  const [watchlist, setWatchlist] = useState([{ticker: 'BTC'}, {ticker: 'ETH'}, {ticker: 'ADA'}])   // array of ticker details received from backend


 ////-------DELETE FUNCTIONALITY---------//////

  function handleDelete (ticker) {   // event handler that deletes a ticker row from the dashboard

    setDashList(dashList.filter(coinObject => coinObject.symbol !== ticker));     // removes ticker details from dashList 

    setWatchlist(watchlist.filter(coin => coin.symbol !== ticker));     // removes ticker from watchlist

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

   ////-------ADD FUNCTIONALITY---------//////

  const handleAdd = (coin) => { // fix input, NOT TARGET!!!
    console.log('invoking handleAdd on search');
    console.log('tickerName is ', coin);
    console.log('dashList is ', dashList);

    setDashList([...dashList, coin]);
    console.log('dashList is this after add', dashList);
  }

  ////-------SEARCH FUNCTIONALITY---------//////
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


 ////-------RENDER WATCHLIST FUNCTIONALITY---------//////


  // useEffect(() => {
  //   fetch('http://localhost:3001/dashboard', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       username: appUser.username
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(data => data.json())
  //     .then(response => {
  //       console.log('response is ', response);
  //       setWatchlist(response);
  //     })
  // }, [])
  

 


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
    <div className="price-chart">
      <Routes>
        {/* <Route path = "/dashboard" element = {<PriceChart coin={coinID} />} /> */}
        <Route path=":coinID" component={<PriceChart />} />
      </Routes>
    </div>
    <div className="watchlist">
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