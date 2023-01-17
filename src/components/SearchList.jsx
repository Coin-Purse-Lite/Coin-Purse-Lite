import React from 'react';
import '../styles/Searchlist.css';
// import CoinCard from './CoinCard';
// import {Line} from 'react-chartjs-2'

const CoinList = (props) => {
  
  const { coinData, handleDelete, dashList, setDashList, watchList, setWatchList, handleAdd } = props;

  console.log("this is the array of coins", coinData)

//   const data = {
//       labels: coinData.map(coin => coin.name),
//       datasets: [
//         {
//           label: 'Price (USD)',
//           data: coinData.map(coin => coin.priceUsd),
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1
//         }
//       ]
//     };
  
//   const handleAdd = (coin) => { // fix input, NOT TARGET!!!
//     console.log('invoking handleAdd on search');
//     console.log('tickerName is ', coin);
//     console.log('dashList is ', dashList);

//     dashList.push(coin);
//     console.log('dashList is this after add', dashList);

    // fetch request 
    // fetch('http://localhost:3001/dashboard/search', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     ticker: symbol,
        
    //   }), // should send tickername, username
    //   headers: {'Content-Type': 'application/json'}
    //   }
    // )
    //   .then((response) => {
    //   response.json()
    //   console.log(response);
    //   })  // will receive list of all tickers as an array of objects
    //   .then((response) => {
    //     console.log(response)
    //     if(response.ok) {
    //       setDashList(dashList.push(response)) // alternatively pass in callback
    //     }
    //   })
    // }

    function roundToTwoDecimals(number) {
      return Math.round(number * 100) / 100
    }
    
    
    function roundToMillionOrBillion(number) {
      if (number >= 1000000000) {
        return `${(number / 1000000000).toFixed(2)}b`;
      } else if (number >= 1000000) {
        return `${(number / 1000000).toFixed(2)}m`;
      } else {
        return number;
      }
    }
    
    

  return (
      <div className='SearchList'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coinData.slice(0,10).map(coin => (
              <tr key={coin.id}>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>{roundToTwoDecimals(coin.priceUsd)}</td>
                <td>
                  <button className='add-btn' onClick={() => handleAdd(coin)}>Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  );
}
  

export default CoinList;

