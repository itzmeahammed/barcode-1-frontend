import React, { useState } from "react";
import Barcode from "react-barcode";

import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const InvoiceModal = ({ open, onClose, invoiceData }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='invoice-modal-title'
      aria-describedby='invoice-modal-description'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
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
                    <TableCell align='right'>{invoiceData?.stock}</TableCell>
                    <TableCell align='right'>{invoiceData?.price}</TableCell>
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
          Total Amount: ₹{(invoiceData?.stock * invoiceData?.price).toFixed(2)}
        </Typography>

        {/* Close Button */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button onClick={onClose} variant='contained' color='primary'>
            Close
          </Button>
        </Box>
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
    </Modal>
  );
};

const InvoiceApp = ({ invoiceData, open, setopen }) => {
  const handleClose = () => setopen(false);

  // delete invoiceData?.id;

  //   const invoiceData = {
  //     id: "INV12345",
  //     customerName: "John Doe",
  //     products: [
  //       { name: "Laptop", quantity: 2, price: 50000 },
  //       { name: "Headphone", quantity: 1, price: 3000 },
  //       { name: "Mouse", quantity: 1, price: 1000 },
  //     ],
  //     totalAmount: 2 * 50000 + 1 * 3000 + 1 * 1000,
  //   };

  return (
    <div>
      <InvoiceModal
        open={open}
        onClose={handleClose}
        invoiceData={invoiceData}
      />
    </div>
  );
};

export default InvoiceApp;
