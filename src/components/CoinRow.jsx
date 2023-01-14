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


    </div>
  )
}
