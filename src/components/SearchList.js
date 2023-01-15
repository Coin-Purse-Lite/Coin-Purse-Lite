import React from 'react';
// import CoinCard from './CoinCard';
// import {Line} from 'react-chartjs-2'

const CoinList = ({ coinData, handleDelete}, props) => {

  const { dashList, setDashList, watchList, setWatchList } = props;

  console.log(coinData)

  const data = {
      labels: coinData.map(coin => coin.name),
      datasets: [
        {
          label: 'Price (USD)',
          data: coinData.map(coin => coin.priceUsd),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };
  
  // const handleAdd = (target) => { // fix input, NOT TARGET!!!
  //   console.log('invoking handleAdd on search');
  //   console.log('tickerName is ', tickerName);

  //   // fetch request 
  //   fetch('http://localhost:3001/dashboard/search', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       ticker: tickerName,
        
  //     }), // should send tickername, username
  //     headers: {'Content-Type': 'application/json'}
  //     }
  //   )
  //     .then((response) => {
  //     response.json()
  //     console.log(response);
  //     })  // will receive list of all tickers as an array of objects
  //     .then((response) => {
  //       console.log(response)
  //       if(response.ok) {
  //         setDashList(dashList.push(response)) // alternatively pass in callback
  //       }
  //     })
  //   }
    

  return (
      <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {coinData.map(coin => (
          <tr key={coin.id}>
            <td>{coin.name}</td>
            <td>{coin.symbol}</td>
            <td>{coin.priceUsd}</td>
            <td>
              <button onClick={() => handleAdd(coin.id)}>Add</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>


  );
}
  

export default CoinList;

