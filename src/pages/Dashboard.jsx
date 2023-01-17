import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import CoinDisplay from "../components/CoinDisplay";
import CoinRow from "../components/CoinRow";
import Searchbar from "../components/Searchbar";
import SearchList from "../components/SearchList";
import HeadModule from "../components/HeadModule";
import PriceChart from "../components/PriceChart";
import "../styles/Dashboard.css";
import NewsComponent from "../components/NewsComponent";

export default function Dashboard(props) {
  const { user } = props

  const [searchTerm, setSearchTerm] = useState(""); // string captured from the search bar that is sent to the server
  const [coinData, setCoinData] = useState([]); // array received from server containing detailed coin information
  const [appUser, setAppUser] = useState(user); // user is an object with username and password
  const [dashList, setDashList] = useState([]); // array of ticker symbols to be sent to backend
  const [watchlist, setWatchlist] = useState([
    { ticker: "BTC" },
    { ticker: "ETH" },
    { ticker: "ADA" },
  ]); // array of ticker details received from backend


  ////-------DELETE FUNCTIONALITY---------//////


  // event handler that deletes a ticker row from the dashboard
  function handleDelete (coin) {
    const deletion = {
      method: 'PUT',
      body: JSON.stringify({
        ticker: coin.symbol,
        username: user
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // request to update user's watchlist
    fetch('http://localhost:3001/dashboard/delete', deletion)
    .then(response => response.json())
    // .then(response => console.log(response))
    .then(response => {
      setWatchlist(response.watchlist);
      setDashList(dashList.filter(coinObject => coinObject.symbol !== coin.symbol))
      console.log(`removed ${coin.symbol} to watchlist`);
      console.log('removed from dashlist: ', coin)
    })
    .catch(err => console.log(err))

  }

  const handleAdd = (coin) => { // fix input, NOT TARGET!!!
    console.log('invoking handleAdd on search');
    console.log('tickerName is ', coin.symbol);
    // console.log('dashList is ', dashList);
    const posting = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticker: coin.symbol,
        username: user.username
      })
    }
    
    fetch('http://localhost:3001/dashboard/search', posting)
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(response => {
        // console.log('watchlist: ', watchlist);
        // console.log('response: ', response.watchlist);
        if(watchlist.includes(coin.symbol)) {
          console.log('ticker already exists');
          return alert('ticker already exists')
        }
        else {
          setWatchlist(response.watchlist);
          setDashList([...dashList, coin])
          console.log(`added ${coin.symbol} to watchlist`);
          console.log('added to dashlist: ', coin);
        }
      })
      .catch(err => console.log(err))

  }


  ////-------SEARCH FUNCTIONALITY---------//////
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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
    };
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
      <h1
        className="LOGINH1"
        style={{
          backgroundColor: "white",
          padding: "5px",
          fontSize: "18px",
          fontWeight: "900",
        }}
      >
        Logged in as: {appUser.username}
      </h1>
      <div className="head-module">
        <HeadModule
          handleSearch={handleSearch}
          coinData={coinData}
          dashList={dashList}
          watchList={watchlist}
          handleAdd={handleAdd}
        />
      </div>
      <div className="price-chart">
        {/* <PriceChart /> */}
        <Routes>
          <Route path=":coinID" element={<PriceChart />} />
        </Routes>
      </div>
      <div className="watchlist">
        <CoinDisplay
          dashList={dashList}
          handleDelete={handleDelete}
          searchTerm={searchTerm}
          setCoinData={setCoinData}
        />
      </div>
      <div className="news-module">
        <h1 className="bg-white">News</h1>
        <NewsComponent />
      </div>
    </div>
  );
}
