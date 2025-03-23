import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import "../styles/addProduct.css";
import PlusIcon from "../assets/svg/plusIcon.svg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

// http://localhost:6778/api/product/createProduct
const AddProduct = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const [isCreateClicked, setisCreateClicked] = useState(false);
  const [productData, setproductData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e) => {
    setproductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addProduct = async () => {
    // setisLoading(true);
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
      setisCreateClicked(false);
    } catch (error) {
      console.log(error);
    } finally {
      // setisLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/signin");
  }, []);

  return (
    <>
      {/* {isLoading && <Loader open={true} />} */}
      <div className='addproduct-main-container'>
        <div
          className='addproduct-default-container'
          onClick={() => setisCreateClicked(true)}
        >
          <p className=''>Add Product</p>
          <img src={PlusIcon} alt='' />
        </div>
        <Modal
          open={isCreateClicked}
          onClose={() => setisCreateClicked(false)}
          className='addproduct-modal-container'
        >
          <form action='' className='addproduct-form'>
            <h1 className='title'>Add Product</h1>

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
      </div>
    </>
  );
};

export default AddProduct;
