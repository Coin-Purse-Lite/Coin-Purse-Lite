import React, {useState} from 'react'
import '../styles/CoinRow.css'

export default function CoinRow(props) {

  const [ticker, setTicker] = useState(props.ticker);
  const [mcap, setMcap] = useState(0);
  const [price, setPrice] = useState(0);
  const [sevenDay, setSevenDay] = useState(0);
  const [thirtyday, setThirtyday] = useState(0);
  const [oneYear, setOneYear] = useState(0);
  const [todayChange, setTodayChange] = useState(0);



  

  return (
    <div className="CoinRow">
      <table>
        <td>{props.coin.marketCap}</td>
        <td>{props.coin.price}</td>
        <td>{props.coin.sevenDay}</td>
        <td>{props.coin.thirtyDay}</td>
        <td>{props.coin.oneYear}</td>
        <td>{props.coin.TODAY}</td>
        <button className='delete_btn' onClick={() => props.handleDelete(props.coin.ticker)}>-</button>
      </table>
    </div>
  )
}