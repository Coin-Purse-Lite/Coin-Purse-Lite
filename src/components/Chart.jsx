import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ chartData }) {
  if (!chartData || !chartData.prices) return <h1>Coin Not Available</h1>;

  const data = chartData.prices.map((d) => {
    return {
      timestamp: new Date(d[0]).toLocaleDateString(),
      price: Math.floor(d[1]),
    };
  });

  return (
    <div className="Chart">
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis
          label={{ value: "Price in USD", angle: -90, position: "insideLeft" }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
      </LineChart>
    </div>
  );
}
