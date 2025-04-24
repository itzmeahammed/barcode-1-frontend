import React, { useEffect, useState } from "react";
import Products from "./products";
import SideBar from "./sideBar";
import "../styles/dasboard.css";
import AddProduct from "./addProduct";
import Analytics from "./analytics";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import InvoiceHIstory from "./invoiceHIstory";
import AttendanceCard from "./attendenceCard";

const Dashboard = () => {
  const [currentName, setcurrentName] = useState("products");
  const [open, setopen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/signin");
  }, []);
  return (
    <div className='dasboard-container'>
      <SideBar
        setcurrentName={setcurrentName}
        setopen={setopen}
        currentName={currentName}
      />
      {currentName == "products" ? (
        <Products />
      ) : currentName == "addproducts" ? (
        <AddProduct open={open} setopen={setopen} />
      ) : currentName == "analytics" ? (
        <Analytics />
      ) : currentName == "markattendence" ? (
        <AttendanceCard />
      ) : (
        <InvoiceHIstory />
      )}
    </div>
  );
};

export default Dashboard;
