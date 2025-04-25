import React, { useEffect, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";

import Loader from "./loader";
import AttendenceStatusCard from "./attendenceStatusCard";

const AttendenceStatus = () => {
  const [value, setValue] = useState("present");
  const token = Cookies.get("token");
  const [isLoading, setisLoading] = useState(false);
  const [staffsData, setstaffsData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getstaffsData = async () => {
    setisLoading(true);
    try {
      const res = await fetch(
        `http://localhost:6778/api/attendance/getAll?status=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await res.json();
      console.log(data);

      setstaffsData(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getstaffsData();
  }, [value]);
  return (
    <div className='w-100' style={{ overflowX: "hidden" }}>
      <div>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='wrapped label tabs example'
          >
            <Tab value='present' label='Present' wrapped />
            <Tab value='absent' label='Absent' />
          </Tabs>
        </Box>
        {isLoading && <Loader open={true} />}

        <div
          style={{
            overflowY: "auto",
            height: "90vh",
            padding: "40px",
          }}
          className='w-100'
        >
          {staffsData?.length > 0 ? (
            staffsData?.map((val, key) => (
              <AttendenceStatusCard data={val?.employee} status={value} />
            ))
          ) : (
            <p className='d-flex-full w-100'>No Data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendenceStatus;
