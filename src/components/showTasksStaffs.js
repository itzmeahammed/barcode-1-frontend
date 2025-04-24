import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "./loader";
import TaskCard from "./taskCard";

import "../styles/staffs.css";

const ShowTasksStaffs = () => {
  const token = Cookies.get("token");

  const [mytasks, setmytasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setuserData] = useState([]);

  const getmyTasks = async () => {
    setisLoading(true);
    try {
      const res = await fetch(
        `http://localhost:6778/api/task/getAlltask?employee=${userData?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await res.json();
      setmytasks(data);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
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
    getuserData();
  }, []);

  useEffect(() => {
    userData?.id && getmyTasks();
  }, [userData]);

  return (
    <>
      {isLoading && <Loader open={true} />}
      <div className='staffs-container'>
        {mytasks?.map((val, key) => (
          <TaskCard taskData={val} />
        ))}
      </div>
      ;
    </>
  );
};

export default ShowTasksStaffs;
