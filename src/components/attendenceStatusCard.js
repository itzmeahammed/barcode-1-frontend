import React from "react";

const AttendenceStatusCard = ({ data, status, date }) => {
  return (
    <div className='staff-card' style={{ width: "300px" }}>
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
          <strong>Status:</strong>&nbsp;
          {status}
        </p>
        <p className='product-category'>
          <strong>Date:</strong>&nbsp;
          {date}
        </p>
        <p className='product-category'>
          <strong>Mobile no:</strong>&nbsp;
          {data?.number}
        </p>
      </div>
    </div>
  );
};

export default AttendenceStatusCard;
