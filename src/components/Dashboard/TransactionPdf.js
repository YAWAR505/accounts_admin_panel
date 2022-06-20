import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { jsPDF } from "jspdf";
import DataTable from "react-data-table-component";

const useStyles = makeStyles(() => ({
  pdfView: {
    width: "100%",
  },
  InvoiceHead: {
    color: "#fff",
    backgroundColor: "#0067B8",
    fontWeight: "bold",
    fontSize: "20px",
    borderRadius: "5px",
    height: "10px",
  },
  InvoiceTo: {
    color: "#0067B8",
  },
  pdflist: {
    marginBottom: "20px",
  },
  total: {
    width: "100%",

    borderCollapse: "collapse",
    marginTop: "30px",
    "& td": {
      textAlign: "center",
      border: "none",
      padding: "10px 0",

      borderBottom: "1px solid",
    },
    "& th": {
      backgroundColor: "#0067B8",
      color: "#fff",
      padding: "10px 0",
      borderRadius: "5px",
    },
  },
}));

const TransactionPdf = ({ row }) => {
  const classes = useStyles();
  const pdfRef = useRef(null);

  const handleDownload = () => {
    const Content = pdfRef.current;
    const pdf = new jsPDF("p", "px", "a4");
    Content.style.display = "block";
    pdf.html(Content, {
      callback: function (pdf) {
        pdf.save("Invoice.pdf");
        Content.style.display = "none";
      },
      html2canvas: { scale: 0.6 },
      x: 10,
      y: 10,
      height: 300,

      width: 200,
      windowWidth: 700,
    });
  };

  return (
    <>
      <div ref={pdfRef} style={{ display: "none", position: "absolute" }}>
        <Card>
          <CardHeader title="INVOICE" className={classes.InvoiceHead} />
          <CardContent>
            <Typography variant="h5" className={classes.InvoiceTo}>
              TO
            </Typography>

            <ListItemText>Student Name:- {row?.studentName} </ListItemText>
            <ListItemText> Class:- {row?.class} </ListItemText>
            <ListItemText> User Id:- {row?.user_id} </ListItemText>
            <ListItemText> Fee Type:- {row?.feeType} </ListItemText>
            <ListItemText>Amount:- {row?.Amount} </ListItemText>
          </CardContent>
        </Card>
        <Divider />
        <Typography variant="h5" className={classes.InvoiceTo}>
          Transaction History
        </Typography>
        <table className={classes.total}>
          <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>{row.feeType}</td>
            <td>{row?.Amount}</td>

            <td>{row?.Amount}</td>
          </tr>
        </table>
      </div>
      <Button variant="outlined" color="primary" onClick={handleDownload}>
        Pdf
      </Button>
    </>
  );
};

export default TransactionPdf;
