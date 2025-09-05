"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const data = {
  labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
  datasets: [
    {
      label: "売上（円）",
      data: [12000, 19000, 3000, 5000, 20000, 15000],
      borderColor: "#1976d2",
      backgroundColor: "rgba(25, 118, 210, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: "#1976d2",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true, position: "top" as const },
    title: { display: true, text: "月別売上推移" },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

export default function SalesChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
}