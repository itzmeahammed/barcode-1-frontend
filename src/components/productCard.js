import React, { useState } from "react";
import "../styles/productCard.css";
import Barcode from "react-barcode";
import Additem from "./addItemPopUp";
import InvoicePopUp from "./invoicePopUp";

const ProductCard = ({ data, setisUpdated }) => {
  //   const objArray = [];
  const obj = Object.values(data);

  //   console.log(Object.values(data));
  const [isCreateClicked, setisCreateClicked] = useState(false);

  const newobj = obj.slice(1, 4).join("\n");
  const [invoiceOpen, setinvoiceOpen] = useState(false);
  const [addItemData, setaddItemData] = useState(data);

  // http://localhost:5000/api/product/deleteProduct?id=

  const deleteProduct = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/product/deleteProduct?id=${data?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnNvbjEyM0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImthdGhpciIsImV4cCI6MTc0MjQwMDY2Nn0.cxHLTNGZe7Xo2J_z4WLtVm6ObzsxRIqwoMxBowuQMMc",
          },
        }
      );
      setisUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isCreateClicked && (
        <Additem
          isCreateClicked={isCreateClicked}
          setisCreateClicked={setisCreateClicked}
          setopen={setinvoiceOpen}
          addItemData={addItemData}
          setinvoiceOpen={setinvoiceOpen}
          setaddItemData={setaddItemData}
          setisUpdated={setisUpdated}
        />
      )}
      <InvoicePopUp
        invoiceData={addItemData}
        open={invoiceOpen}
        setopen={setinvoiceOpen}
      />
      <div className='product-card'>
        <img src={data?.image} alt='' />
        <div className='card-body-1'>
          <p className='product-name'>{data?.name}</p>
          <p className='product-category'>{data?.category}</p>
        </div>
        <p className='product-price'>&#8377; {data?.price}</p>

        <div className='card-body-1'>
          {/* <p className='product-unit'> {data?.unit}</p> */}
          <p className='product-exp-date'> {data?.expiry_date}</p>

          <p className='product-brand'> {data?.brand}</p>
        </div>
        <p className='product-stock'> Stock: {data?.stock}</p>

        <div className='product-btn-container'>
          <button
            className='additem-btn'
            onClick={() => setisCreateClicked(true)}
          >
            Add Item
          </button>
          <button className='deleteitem-btn' onClick={() => deleteProduct()}>
            Delete Item
          </button>
        </div>
        <div className='barcode-container'>
          <Barcode value={newobj} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
