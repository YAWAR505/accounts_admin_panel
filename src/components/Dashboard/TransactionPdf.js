import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";

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
  pdfButton: {
    color: "#dc5151",
  },
}));

const TransactionPdf = ({ row }) => {
  const classes = useStyles();

  return (
    <>
      <CardHeader title="INVOICE" className={classes.InvoiceHead} />

      <div
        style={{
          backgroundColor: "#A9A3A2",
          padding: "10px",
          marginTop: "100px",
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" className={classes.InvoiceTo}>
              User Details
            </Typography>
            <ListItemText>Student Name:- {row?.studentName} </ListItemText>
            <ListItemText> Class:- {row?.class} </ListItemText>
            <ListItemText> User Id:- {row?.user_id} </ListItemText>
            <ListItemText> Fee Type:- {row?.feeType} </ListItemText>
            <ListItemText>Amount:- {row?.Amount} </ListItemText>
          </CardContent>
        </Card>
        <Divider />
        <Card>
          <CardContent>
            <Typography variant="h5" className={classes.InvoiceTo}>
              Transaction History
            </Typography>
            <table className={classes.total}>
              <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Amount (INR)</th>
              </tr>
              <tr>
                <td>{row.feeType}</td>
                <td>{row?.Amount}</td>
                <td> {row.Amount}</td>
              </tr>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TransactionPdf;
