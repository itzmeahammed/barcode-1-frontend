import React, { useState } from "react";
import "../styles/staffsCard.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const categories = [
  "Shoes",
  "Milk",
  "Electronics",
  "Groceries",
  "Clothing",
  "Furniture",
  "Toys",
  "Books",
  "Beverages",
  "Cosmetics",
];

const StaffsCard = ({ data, userData }) => {
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const handleAssignClick = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!selectedTask) {
      alert("Please select a task category.");
      return;
    }

    try {
      const res = await fetch("http://localhost:6778/api/task/createTask", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          manager: userData?.id,
          employee: data?.id,
          task: selectedTask,
          status: "assigned",
        }),
      });

      const result = await res.json();
      if (res.ok) {
        const notify = () =>
          toast.success("The Task is assigned to this Staff  successfully!");

        notify();
        // alert("The Task is assigned to this Staff  successfully!");

        setShowModal(false);
      } else {
        const notify = () =>
          toast.error(result?.message || "Failed to assign staff.");

        notify();
        // alert(result?.message || "Failed to assign staff.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className='staff-card'>
        <div className='card-body-1 d-flex-col gap-8'>
          <p className='product-category'>
            <strong>Name:</strong>&nbsp;
            {data?.username}
          </p>
          <p className='product-category'>
            <strong>Role:</strong>&nbsp;
            {data?.role}
          </p>
          <p className='product-category'>
            <strong>Email:</strong>&nbsp;
            {data?.email}
          </p>
          <p className='product-category'>
            <strong>Mobile no:</strong>&nbsp;
            {data?.number}
          </p>
        </div>
        <div className='staff-btn-container'>
          <button className='assign-btn' onClick={handleAssignClick}>
            Assign
          </button>
        </div>
      </div>

      {showModal && (
        <div className='staff-modal '>
          <div className='staff-modal-content '>
            <h3>Select Task Category</h3>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              <option value=''>-- Select Category --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className='staff-modal-buttons'>
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffsCard;
