import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import "../styles/addItemPopUp.css";
import Cookies from "js-cookie";

const Additem = ({
  addItemData,
  isCreateClicked,
  setisCreateClicked,
  setopen,
  setaddItemData,
  setinvoiceOpen,
  setisUpdated,
}) => {
  const token = Cookies.get("token");

  const handleChange = (e) => {
    setaddItemData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setdubData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [dubData, setdubData] = useState(addItemData);

  const [dataId, setdataId] = useState(addItemData?.id);

  const updateProductaddItemData = async () => {
    delete dubData?.id;
    delete dubData?.user;
    delete dubData?.updated_at;
    delete dubData?.created_at;

    try {
      const res = await fetch(
        `http://localhost:6778/api/product/updateProduct?id=${addItemData?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(dubData),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await res.json();
      await fetch("http://localhost:6778/api/invoice/createInvoice", {
        method: "POST",
        body: JSON.stringify(dubData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setinvoiceOpen(true);
      setisUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='additem-main-container'>
        <Modal open={isCreateClicked} className='additem-modal-container'>
          <div action='' className='additem-form'>
            <h1 className='title'>Add Item</h1>

            <TextField
              label='Name'
              name='name'
              type='text'
              value={addItemData?.name || ""}
              onChange={handleChange}
            />
            <TextField
              label='Category'
              name='category'
              type='text'
              value={addItemData?.category || ""}
              onChange={handleChange}
            />
            <TextField
              label='Brand'
              name='brand'
              type='text'
              value={addItemData?.brand || ""}
              onChange={handleChange}
            />
            <TextField
              label='Unit'
              name='unit'
              type='text'
              value={addItemData?.unit || ""}
              onChange={handleChange}
            />
            <TextField
              label='Price'
              name='price'
              type='text'
              value={addItemData?.price || ""}
              onChange={handleChange}
            />
            <TextField
              label='Expiry date'
              name='expiry_date'
              type='text'
              value={addItemData?.expiry_date || ""}
              onChange={handleChange}
            />
            <TextField
              label='Stock'
              name='stock'
              type='number'
              value={addItemData?.stock || ""}
              onChange={handleChange}
            />
            <TextField
              label='Image Url'
              name='image'
              type='text'
              value={addItemData?.image || ""}
              onChange={handleChange}
            />

            <button
              onClick={() => {
                setisCreateClicked(false);
                updateProductaddItemData();
              }}
            >
              Add
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Additem;
