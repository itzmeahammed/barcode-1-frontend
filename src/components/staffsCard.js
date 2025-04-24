import React from "react";
import "../styles/staffsCard.css";
import Cookies from "js-cookie";

const StaffsCard = ({ data }) => {
  const token = Cookies.get("token");
  const handleAssign = async () => {
    try {
      const res = await fetch("http://localhost:6778/api/task/createTask", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          manager: "id",
          employee: "id",
          task: "work",
          status: "assigned",
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Staff assigned successfully!");
      } else {
        alert(result?.message || "Failed to assign staff.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className='staff-card'>
      <div className='card-body-1'>
        <p className='product-name'>{data?.username}</p>
        <p className='product-category'>{data?.role}</p>
        <p className='product-category'>{data?.email}</p>
        <p className='product-category'>{data?.number}</p>
      </div>
      <div className='staff-btn-container'>
        <button className='assign-btn' onClick={handleAssign}>
          Assign
        </button>
      </div>
    </div>
  );
};

export default StaffsCard;
