import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function Chart({ data }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const prices = data.prices.map(p => p[1]);
    const marketCaps = data.market_caps.map(p => p[1]);
    const totalVolumes = data.total_volumes.map(p => p[1]);

    setChartData({
      labels: Array.from({ length: prices.length }, (_, i) => i),
      datasets: [
        {
          label: 'Price',
          data: prices,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Market Cap',
          data: marketCaps,
          backgroundColor: 'rgba(99, 255, 132, 0.2)',
          borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Total Volume',
          data: totalVolumes,
          backgroundColor: 'rgba(99, 132, 255, 0.2)',
          borderColor: 'rgba(99, 132, 255, 1)',
          borderWidth: 1
        }
      ]
    });
  }, [data]);

  return (
    <div>
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
