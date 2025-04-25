import React, { useState } from "react";
import "../styles/sidebar.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../assets/svg/barcode.svg";

const SideBar = ({ setcurrentName, setopen, currentName }) => {
  const navigate = useNavigate();
  const role = Cookies.get("role");

  return (
    <div className='sidebar-container'>
      <div className='sidebar-inner-container'>
        <div
          className='sidebar-logo-container'
          style={{
            display: "flex",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <img src={logo} alt='' width={100} height={40} />
          Barcode Generator
        </div>
        <div className='sidebar-container-header'>
          {role != "employee" && (
            <>
              <button
                onClick={() => setcurrentName("products")}
                className={`${currentName == "products" && "selected-option"}`}
              >
                Products
              </button>
              <button
                onClick={() => {
                  setcurrentName("addproducts");
                  setopen(true);
                }}
                className={`${
                  currentName == "addproducts" && "selected-option"
                }`}
              >
                Add Product
              </button>
              <button
                onClick={() => setcurrentName("analytics")}
                className={`${currentName == "analytics" && "selected-option"}`}
              >
                Analytics
              </button>
              <button
                onClick={() => setcurrentName("invoice")}
                className={`${currentName == "invoice" && "selected-option"}`}
              >
                Invoice History
              </button>
            </>
          )}

          {role == "manager" && (
            <button
              onClick={() => setcurrentName("staffs")}
              className={`${currentName == "staffs" && "selected-option"}`}
            >
              Staffs List
            </button>
          )}
          {role == "employee" && (
            <>
              <button
                onClick={() => setcurrentName("markattendence")}
                className={`${
                  currentName == "markattendence" && "selected-option"
                }`}
              >
                Mark Attendence
              </button>

              <button
                onClick={() => setcurrentName("stafftasks")}
                className={`${
                  currentName == "stafftasks" && "selected-option"
                }`}
              >
                My Tasks
              </button>
            </>
          )}
        </div>
        <div className='sidebar-container-footer'>
          <button
            onClick={() => {
              Cookies.remove("token");
              navigate("/signin");
            }}
            style={{
              color: "#fff",
              background: "#000",
              cursor: "pointer",
              position: "absolute",
              bottom: "20px",
              left: "6%",
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
