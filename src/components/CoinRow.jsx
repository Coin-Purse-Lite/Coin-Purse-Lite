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

  


  return (
    <div className="CoinRow">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Marketcap</th>
            <th>Price</th>
            <th>Seven Day</th>
            <th>Thirty Day</th>
            <th>One Year</th>
            <th>Today Change</th>
            </tr>
        </thead>
        <tbody>
        <tr>
        <td>{el.symbol}</td>
        <td>{el.name}</td>
        <td>{el.marketCapUsd}</td>
        <td>${el.priceUsd}</td>
        <td>{el.supply}</td>
        <td>{el.volumeUsd24Hr}</td>
        
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