import React, { useEffect, useState } from "react";
import "../styles/PriceChart.css";
import { useParams } from "react-router-dom";
import stocklist from "./stocklist.json";
import Chart from "./Chart";

export default function PriceChart() {
  const { coinID } = useParams();
  const [coinData, setCoinData] = useState({});
  const [chartData, setChartData] = useState({});

  function findCoinData(symbol) {
    const coin = stocklist.find((c) => c.symbol === symbol);
    return coin ? { id: coin.id, name: coin.name } : {};
  }

  useEffect(() => {
    const data = findCoinData(coinID);
    setCoinData(data);
  }, [coinID]);

  useEffect(() => {
    if (coinData.id) {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${coinData.id}/market_chart?vs_currency=USD&days=7&interval=daily`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setChartData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [coinData]);

  return (
    <div className="PriceChart">
      <h1>{coinData.name}</h1>
      {chartData && <Chart chartData={chartData} />}
    </div>
  );
}
