import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ products }) => {
  const categories = [...new Set(products.map((product) => product.category))];

  const stockData = categories.map((category) => {
    return products
      .filter((product) => product.category === category)
      .reduce((total, product) => total + product.stock, 0);
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Stock by Category",
        data: stockData,
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        borderRadius: 10, // Rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: "Stock by Product Category",
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
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
