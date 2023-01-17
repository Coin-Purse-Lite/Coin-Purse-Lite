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
  const [dashList, setDashList] = useState([]);
  // array of ticker details received from backend
  const [watchlist, setWatchlist] = useState([...user.watchlist]) 


  // event handler that deletes a ticker row from the dashboard
  function handleDelete (ticker) {
    // removes ticker details from dashList 
    setDashList(dashList.filter(coinObject => coinObject.symbol !== ticker));
    // removes ticker from watchlist
    setWatchlist(watchlist.filter(coin => coin.symbol !== ticker));

    // request to update user's watchlist
    fetch('http://localhost:3001/dashboard/delete', {
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
    console.log('tickerName is ', coin.symbol);
    console.log('dashList is ', dashList);
    
    if (watchlist.find( el => el.ticker === coin.symbol) === undefined) {
      setDashList([...dashList, coin]);
      console.log('dashList is this after add', dashList); 

      const fetchData = async () => {
        const posting = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: {
            ticker: coin.symbol,
            username: appUser
          }
        }
        try{
          const response = await fetch('http://localhost:3001/dashboard/search', posting);
          const data = await response.json(); // is this the updated watchlist or just the ticker that is sent back
          setWatchlist(data.watchlist);
        } catch(err) {
          console.log(err);
        }
      }
      fetchData();
      console.log('added ticker to ', watchlist);
    }
  }

  ////-------SEARCH FUNCTIONALITY ADDED TODAY---------//////
  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // need to conduct a check for duplicates
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
        {/* <h1>Head Module</h1> */}
        <div className="head-module--info">
          {appUser.username}
        </div>
        <div className="watchlist-input">
          {/* <Searchbar watchlist = {watchlist} setWatchlist = {(ticker) => setWatchlist(ticker)} dashList = {dashList} setDashList = {(ticker) => setWatchlist(ticker)}/> */}
          <Searchbar onSearch={handleSearch}/>
          <SearchList coinData={coinData} dashList={dashList} watchlist={watchlist} handleAdd={handleAdd}/>
        </div>
      </div>
      <div className="price-chart">
        <h1>Price Chart</h1>
      </div>
      
      <div className="watchlist">
        {/* <h1>Watchlist</h1> */}
        <div className="watchlist--list">
          <div className='watchlist--header'>
            <table className='table'>
              <tr>
                <th className="table-cell">Symbol</th>
                <th className="table-cell">Name</th>
                <th className="table-cell">Marketcap</th>
                <th className="table-cell">Price</th>
                <th className="table-cell">Supply</th>
                <th className="table-cell">Volume (24h)</th>
                {/* <th>One Year</th> */}
                {/* <th>Today Change</th> */}
              </tr>
            </table>
            <tbody>
              <div className="watchlist--list">
                {dashList.map((el, index) => {
                  return <CoinRow handleDelete = {(el) => handleDelete(el)} el={el}/>
                })}
                </div>
                </tbody>
                {/* <CoinRow handleDelete = {(el) => handleDelete(el)}/> */}
              </div>
            </div>
      </div>
      <div className="news-module">
        <h1>News module</h1>
      </div>
    </div>
  )
}