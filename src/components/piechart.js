import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from "chart.js";

// Register the required chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const PieChart = ({ products }) => {
  // Aggregate the data for each category
  const categories = [...new Set(products.map((product) => product.category))];

  const categoryData = categories.map((category) => {
    return products.filter((product) => product.category === category).length;
  });

  const data = {
    labels: categories,
    datasets: [
      {
        data: categoryData,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Distribution by Category",
      },
    },
    maintainAspectRatio: false, // Allows custom width and height
  };

  return (
    <div style={{ position: "relative", width: "80%", height: "600px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
