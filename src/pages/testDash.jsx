// import React, { useState, useEffect } from "react";
// import { Link, Route, Routes, useParams } from "react-router-dom";
// import CoinDisplay from "../components/CoinDisplay";
// import CoinRow from "../components/CoinRow";
// import Searchbar from "../components/Searchbar";
// import SearchList from "../components/SearchList";
// import HeadModule from "../components/HeadModule";
// import PriceChart from "../components/PriceChart";
// import "../styles/Dashboard.css";
// import NewsComponent from "../components/NewsComponent";

// export default function Dashboard(props) {

//   const { user, dashList, setDashList } = props
//   ////-------SEARCH FUNCTIONALITY ADDED TODAY---------//////
//   // string captured from the search bar that is sent to the server
//   const [searchTerm, setSearchTerm] = useState('');
//   // array received from server containing detailed coin information
//   const [coinData, setCoinData] = useState([]);
  
//   const [appUser, setAppUser] = useState(user); // user is an object with username and password
//   // array of ticker details received from backend
//   const [watchlist, setWatchlist] = useState([]) 


//   // event handler that deletes a ticker row from the dashboard
//   function handleDelete (coin) {
//     const deletion = {
//       method: 'PUT',
//       body: JSON.stringify({
//         ticker: coin.symbol,
//         username: user.username
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }

//     // request to update user's watchlist
//     fetch('http://localhost:3001/dashboard/delete', deletion)
//     .then(response => response.json())
//     // .then(response => console.log(response))
//     .then(response => {
//       setWatchlist(response.watchlist);
//       setDashList(dashList.filter(coinObject => coinObject.symbol !== coin.symbol))
//       console.log(`removed ${coin.symbol} to watchlist`);
//       console.log('removed from dashlist: ', coin)
//     })
//     .catch(err => console.log(err))

//   }

//   // const handleAdd = (coin) => { // fix input, NOT TARGET!!!
//   //   console.log('invoking handleAdd on search');
//   //   console.log('tickerName is ', coin);
//   //   console.log('dashList is ', dashList);

//   //   setDashList([...dashList, coin]);
//   //   console.log('dashList is this after add', dashList);
//   // }

//   const handleAdd = (coin) => { // fix input, NOT TARGET!!!
//     console.log('invoking handleAdd on search');
//     console.log('tickerName is ', coin.symbol);
//     // console.log('dashList is ', dashList);
//     const posting = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         ticker: coin.symbol,
//         username: user.username
//       })
//     }
    
//     fetch('http://localhost:3001/dashboard/search', posting)
//       .then(response => response.json())
//       // .then(response => console.log(response))
//       .then(response => {
//         // console.log('watchlist: ', watchlist);
//         // console.log('response: ', response.watchlist);
//         if(watchlist.includes(coin.symbol)) {
//           console.log('ticker already exists');
//           return alert('ticker already exists')
//         }
//         else {
//           setWatchlist(response.watchlist);
//           setDashList([...dashList, coin])
//           console.log(`added ${coin.symbol} to watchlist`);
//           console.log('added to dashlist: ', coin);
//         }
//       })
//       .catch(err => console.log(err))

//   }

//   ////-------SEARCH FUNCTIONALITY ADDED TODAY---------//////
//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (searchTerm) {
//           const url = `https://api.coincap.io/v2/assets?search=${searchTerm}`;
//           const response = await fetch(url);
//           const data = await response.json();
//           console.log(data);
//           setCoinData(data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, [searchTerm]);

//   return (
//     <div className="Dashboard">
//       <div className="head-module">
//       <HeadModule
//       handleSearch = {handleSearch}
//       coinData = {coinData}
//       dashList = {dashList}
//       watchList = {watchlist}
//       handleAdd = {handleAdd}  />
//       </div>
//       {/* <div className="head-module">
//         {/* <h1>Head Module</h1> */}
//         {/* <div className="head-module--info">
//           {appUser.username}
//         </div> 
//         <div className="watchlist-input">
//           <Searchbar onSearch={handleSearch}/>
//           <SearchList coinData={coinData} dashList={dashList} watchlist={watchlist} handleAdd={handleAdd}/>
//         </div>
//       </div> */}
//       <div className="price-chart">
//         <h1>Price Chart</h1>
//       </div>
      
//       <div className="watchlist">
//         {/* <h1>Watchlist</h1> */}

//         <CoinDisplay 
//         dashList = {dashList} 
//         handleDelete = {handleDelete}
//         searchTerm = {searchTerm}
//         setCoinData = {setCoinData} />

//       </div>
//       <div className="news-module">
//         <h1>News module</h1>
//       </div>
//     </div>
//   )
// }