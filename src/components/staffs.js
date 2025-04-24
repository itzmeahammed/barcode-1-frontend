import React, { useEffect, useState } from "react";
import StaffsCard from "./staffsCard";
import "../styles/products.css";
import Cookies from "js-cookie";
import Loader from "./loader";

const Staffs = () => {
  const token = Cookies.get("token");
  const [staffsData, setstaffsData] = useState([
    {
      name: "John Doe",
      position: "Trainer",
      available: true,
    },
    {
      name: "Jane Smith",
      position: "Receptionist",
      available: false,
    },
  ]);
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const getstaffsData = async () => {
    setisLoading(true);
    try {
      const res = await fetch(
        `http://localhost:6778//api/user/getUser?role="employee"`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await res.json();
      setstaffsData(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getstaffsData();
  }, [isUpdated]);

  return (
    <>
      {isLoading && <Loader open={true} />}
      <div className='staffs-container d-flex-full'>
        {staffsData?.map((val, key) => (
          <StaffsCard data={val} setisUpdated={setisUpdated} />
        ))}
      </div>
    </>
  );
};

export default Staffs;
