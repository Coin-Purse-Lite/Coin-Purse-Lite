import React, {useState} from 'react'
import '../styles/CoinRow.css'

export default function CoinRow(props) {

  const {dashList, el} = props;

  // const [ticker, setTicker] = useState(props.ticker);
  // const [mcap, setMcap] = useState(0);
  // const [price, setPrice] = useState(0);
  // const [sevenDay, setSevenDay] = useState(0);
  // const [thirtyday, setThirtyday] = useState(0);
  // const [oneYear, setOneYear] = useState(0);
  // const [todayChange, setTodayChange] = useState(0);

console.log("this is the coinrow data at the moment", el)

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
    <div className="CoinRow">
      <table>
        <thead>
          <tr>
            {/* <th>Symbol</th>
            <th>Name</th>
            <th>Marketcap</th>
            <th>Price</th>
            <th>Supply</th>
            <th>Volume (24h)</th> */}
            {/* <th>One Year</th> */}
            {/* <th>Today Change</th> */}
            </tr>
        </thead>
        <tbody>
        <tr>
        <td>{el.symbol}</td>
        <td>{el.name}</td>
        <td>{roundToTwoDecimals(el.marketCapUsd)}</td>
        <td>${roundToTwoDecimals(el.priceUsd)}</td>
        <td>{roundToMillionOrBillion(roundToTwoDecimals(el.supply))}</td>
        <td>{roundToMillionOrBillion(roundToTwoDecimals(el.volumeUsd24Hr))}</td>
        
        {/*// <td>{el.explorer}</td>
        // <td>{props.coinData.TODAY}</td> */}
        <td>
        <button className='delete_btn' onClick={() => props.handleDelete(el.symbol)}>-</button>
        </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}