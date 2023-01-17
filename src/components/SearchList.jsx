import React from "react";
import "../styles/Searchlist.css";
// import CoinCard from './CoinCard';
// import {Line} from 'react-chartjs-2'

const CoinList = (props) => {
  const {
    coinData,
    handleDelete,
    dashList,
    setDashList,
    watchList,
    setWatchList,
    handleAdd,
  } = props;

  console.log("this is the array of coins", coinData);


  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
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
    <div className="SearchList">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coinData.slice(0, 10).map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>{roundToTwoDecimals(coin.priceUsd)}</td>
              <td>
                <button className="add-btn" onClick={() => handleAdd(coin)}>
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
