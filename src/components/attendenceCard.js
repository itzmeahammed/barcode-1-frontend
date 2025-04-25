import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";

const AttendanceCard = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const today = dayjs().format("DD-MM-YYYY");

  const token = Cookies.get("token");

  const [userData, setuserData] = useState([]);
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const markAttendance = async () => {
    if (!userData?.id) {
      alert("User ID not found.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:6778/api/attendance/mark", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData?.id,
          date: today,
          status: "present",
          role: "employee",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const notify = () => toast.success("Attendance marked successfully.");

        notify();
        setOpen(false);
      } else {
        const notify = () =>
          toast.error(data?.message || "Failed to mark attendance.");

        notify();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      const notify = () => toast.error("Something went wrong.");
      notify();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        bgcolor='#f4f6f8'
        sx={{ width: "100%" }}
      >
        <Paper
          elevation={4}
          onClick={handleOpen}
          sx={{
            border: "2px dashed #1976d2",
            padding: "60px 80px",
            borderRadius: "18px",
            cursor: "pointer",
            textAlign: "center",
            transition: "0.3s",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#e3f2fd",
              boxShadow: 8,
            },
          }}
        >
          <Typography variant='h5' fontWeight='bold' color='primary'>
            Mark Attendance
          </Typography>
        </Paper>

        <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
          <DialogTitle
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Mark Attendance
          </DialogTitle>

          <DialogContent sx={{ py: 3 }}>
            <Typography variant='body1' align='center' gutterBottom>
              You are marking attendance for:
            </Typography>
            <Typography
              variant='h6'
              align='center'
              sx={{ color: "#1976d2", fontWeight: 500 }}
            >
              {today}
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button onClick={handleClose} disabled={loading} variant='outlined'>
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={markAttendance}
              disabled={loading}
              sx={{ minWidth: 150 }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                "Mark Attendance"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AttendanceCard;
