import React from 'react'
import '../styles/PriceChart.css';
import { useParams } from 'react-router-dom';

export default function PriceChart(props) {
  
  const { coinID } = useParams();

  return (
    <div className="PriceChart">
      <h1>{coinID}</h1>
      {console.log(coinID)}
      <h1>hello</h1>
    </div>
  )
}
