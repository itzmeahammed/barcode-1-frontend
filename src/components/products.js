import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import "../styles/products.css";
import Cookies from "js-cookie";
import Loader from "./loader";

const Products = () => {
  const token = Cookies.get("token");
  const [productData, setproductData] = useState([]);
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoading, setisLoading] = useState(false);


  const getProductData = async () => {
    setisLoading(true);
    try {
      const res = await fetch("http://localhost:6778/api/product/getProduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setproductData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [isUpdated]);

  return (
    <>
      {isLoading && <Loader open={true} />}
      <div className='products-container'>
        {productData?.map((val, key) => (
          <ProductCard data={val} setisUpdated={setisUpdated} />
        ))}
      </div>
    </>
  );
};

export default Products;
