import React, { useEffect, useState } from "react";
import AddProduct from "./addProduct";
import { Modal, TextField } from "@mui/material";
import Cookies from "js-cookie";

const TaskCard = ({ taskData }) => {
  const data = taskData?.manager;

  const [isOpen, setisOpen] = useState(false);
  const token = Cookies.get("token");

  const [productData, setproductData] = useState({});

  const handleChange = (e) => {
    setproductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:6778/api/product/createProduct`,
        {
          method: "POST",
          body: JSON.stringify(productData),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setisOpen(true);
    }
  };

  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => setisOpen(false)}
          className='addproduct-modal-container'
        >
          <form
            action=''
            className='addproduct-form'
            style={{ overflowY: "auto", height: "80vh" }}
          >
            <h1 className='title'>Add Product</h1>
            {taskData?.task && (
              <div className='d-flex-al'>
                <h3>Task Assigned:</h3>
                <span>
                  Add product related to <strong>{taskData?.task}</strong>
                </span>
              </div>
            )}
            {data?.username && (
              <div className='d-flex-al'>
                <h3>Assigned By:</h3> {data?.username}
              </div>
            )}
            <TextField
              label='Name'
              name='name'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label='Category'
              name='category'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label='Brand'
              type='text'
              name='brand'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label='Unit'
              type='text'
              name='unit'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label='Price'
              type='text'
              name='price'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label='Expiry date'
              type='text'
              name='expiry_date'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label='Stock'
              type='number'
              name='stock'
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label='Image Url'
              type='text'
              name='image'
              onChange={(e) => handleChange(e)}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                addProduct();
              }}
            >
              Add
            </button>
          </form>
        </Modal>
      )}
      <div className='staff-card '>
        <div className='card-body-1 d-flex-col gap-8'>
          <p className='product-name'>{taskData?.task}</p>
          <p className='product-category'>{data?.username}</p>
          <p className='product-category'>{data?.email}</p>
          <p className='product-category'>{data?.number}</p>
        </div>
        <div className='staff-btn-container'>
          <button className='assign-btn' onClick={() => setisOpen(true)}>
            complete work
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
