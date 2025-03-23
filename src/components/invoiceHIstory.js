import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Barcode from "react-barcode";
import Loader from "./loader";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const InvoiceHIstory = () => {
  const token = Cookies.get("token");
  const [isLoading, setisLoading] = useState(false);

  const [invoiceDatas, setinvoiceDatas] = useState([]);
  const getInvoiceDatas = async () => {
    setisLoading(true);
    try {
      const res = await fetch(
        "http://localhost:6778/api/invoice/getInvoicesByUser",
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

      setinvoiceDatas(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    getInvoiceDatas();
  }, []);
  return (
    <>
      {isLoading && <Loader open={true} />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          padding: "16px",
          flexWrap: "wrap",
          overflowY: "auto",
          maxHeight: "95vh",
        }}
      >
        {invoiceDatas?.map((invoiceData, key) => (
          <Box
            sx={{
              width: 500,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              border: "1px solid grey",
              p: 4,
            }}
          >
            <Typography
              variant='h6'
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Invoice Details
            </Typography>

            {/* Invoice Information */}
            <Typography variant='body1' sx={{ marginBottom: 2 }}>
              <strong>Invoice ID:</strong> {invoiceData?.id}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 2 }}>
              <strong>Customer Name:</strong> {invoiceData?.name}
            </Typography>

            {/* Product Table */}
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
              <Table aria-label='product invoice table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Product</strong>
                    </TableCell>
                    <TableCell align='right'>
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell align='right'>
                      <strong>Price</strong>
                    </TableCell>
                    <TableCell align='right'>
                      <strong>Total</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    invoiceData && (
                      // invoiceData?.products.map((product, index) => (
                      <TableRow>
                        <TableCell>{invoiceData?.name}</TableCell>
                        <TableCell align='right'>
                          {invoiceData?.stock}
                        </TableCell>
                        <TableCell align='right'>
                          {invoiceData?.price}
                        </TableCell>
                        <TableCell align='right'>
                          {(invoiceData?.stock * invoiceData?.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )
                    // ))
                  }
                </TableBody>
              </Table>
            </TableContainer>

            <Typography
              variant='body1'
              sx={{ fontWeight: "bold", textAlign: "right" }}
            >
              Total Amount: ₹
              {(invoiceData?.stock * invoiceData?.price).toFixed(2)}
            </Typography>

            {/* Close Button */}
            {/* <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button onClick={onClose} variant='contained' color='primary'>
            Close
          </Button>
        </Box> */}
            <div
              className='invoice-barcode-container'
              style={{
                // "display": "flex";
                // align-self: flex-start;
                // max-width: 320px;
                // min-width: 320px;
                display: "flex",
                alignSelf: "flex-start",
                width: "100%",
              }}
            >
              <Barcode value={invoiceData?.name} />
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default InvoiceHIstory;
