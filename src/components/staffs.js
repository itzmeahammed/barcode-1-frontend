import React, { useEffect, useState } from "react";
import StaffsCard from "./staffsCard";
import "../styles/products.css";
import Cookies from "js-cookie";
import Loader from "./loader";

const Staffs = () => {
  const token = Cookies.get("token");
  const [staffsData, setstaffsData] = useState([]);
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setuserData] = useState({});

  const getstaffsData = async () => {
    setisLoading(true);
    try {
      const res = await fetch(
        `http://localhost:6778//api/user/getAllUser?role=${"employee"}`,
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

  const getuserData = async () => {
    try {
      const res = await fetch(`http://localhost:6778//api/user/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setuserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getstaffsData();
    getuserData();
  }, [isUpdated]);

  return (
    <>
      {isLoading && <Loader open={true} />}
      <div className='staffs-container d-flex-full'>
        {staffsData?.map((val, key) => (
          <StaffsCard
            data={val}
            userData={userData}
            setisUpdated={setisUpdated}
          />
        ))}
      </div>
    </>
  );
};

export default Staffs;
