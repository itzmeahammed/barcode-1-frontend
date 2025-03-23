import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Loader = ({ open }) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={open}>
      <CircularProgress color='green' />
    </Backdrop>
  );
};

export default Loader;
