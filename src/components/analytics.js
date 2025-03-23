import React, { useEffect, useState } from "react";
import BarChart from "./barChart";
import LineChart from "./lineChart";
import PieChart from "./piechart"; // Import the new PieChart
import "../styles/analytics.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/signin");

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:6778/api/product/getProduct",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <div className='analytics-main-container'>
      <div className='chart-card'>
        <BarChart products={products} />
      </div>
      <div className='chart-card'>
        <LineChart products={products} />
      </div>
      <div className='chart-card'>
        <PieChart products={products} /> {/* Add the new PieChart here */}
      </div>
    </div>
  );
};

export default Analytics;
