import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components for the Line chart
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ products }) => {
  const productNames = [...new Set(products.map((product) => product.name))];

  const data = productNames.map((name) => {
    const product = products.find((product) => product.name === name);
    return product ? product.stock : 0;
  });

  const chartData = {
    labels: productNames,
    datasets: [
      {
        label: "Stock Levels",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.4, // Smooth curve for the line
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: "Product Stock Over Time",
        font: { size: 20, weight: "bold" },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 14, weight: "bold" }, color: "#333" },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 14, weight: "bold" }, color: "#333" },
        grid: { color: "#f0f0f0" },
      },
    },
    layout: { padding: 30 },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
