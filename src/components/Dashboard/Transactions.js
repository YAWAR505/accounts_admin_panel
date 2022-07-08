import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import { CSVLink } from "react-csv";
import TransactionPdf from "./TransactionPdf";
import { jsPDF } from "jspdf";
import { renderToString } from "react-dom/server";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import myimage from "../../images/myimage.jpg";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Widget from "./Widget";
import Loader from "../Constants/Loader";
const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: "10px 0",
    width: "100%",
  },
  daterange: {
    textAlign: "center",
  },
  csvFile: {
    width: "15%",
    textDecoration: "none",
    display: "flex",
    justifyContent: " space-around",
    color: "#fff",
    marginTop: "10px",
    backgroundColor: "blue",
    padding: "10px 0",
    borderRadius: "5px",
  },
  csvFileParent: {
    display: "flex",
    justifyContent: "space-between",
    width: "99%",
  },
  typo: {
    marginLeft: "10px",
  },
  search: {
    margin: "10px 0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  pdfButton: {
    color: "#dc5151",
  },
}));
const Transactions = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [pending, setPending] = useState(true);

  const [q, setQ] = useState("");
  console.log(FilteredData);
  useEffect(() => {
    const q = query(collection(db, "PayFee"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const Transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(Transactions);
    });
    return () => unsubscribe();
  }, []);

  const downloadInvoice = (row) => {
    console.log(row);
    const pdf = new jsPDF("p", "px", "a4");
    const html = renderToString(<TransactionPdf row={row} />);
    pdf.html(html, {
      callback: function (pdf) {
        pdf.addImage(myimage, "JPEG", 30, 40, 60, 40);
        pdf.save(`${row.studentName}.pdf`);
      },
      html2canvas: { scale: 0.6 },
      x: 10,
      y: 10,
      width: 200,
      windowWidth: 700,
    });
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.user_id,
      sortable: true,
      reorder: false,
    },
    {
      name: "Name",
      selector: (row) => row.studentName,
      reorder: false,
    },
    {
      name: "Class",
      selector: (row) => row.class,
      reorder: false,
    },
    {
      name: "Fee Type",
      selector: (row) => row.feeType,
      reorder: false,
    },
    {
      name: "Fee Status",
      selector: (row) => (
        <Badge
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            backgroundColor:
              row.feeType === "monthly_fee" || row.feeType === "admission"
                ? "#029904"
                : "#DC143C",
            color: "#fff",
          }}
        >
          {row.feeType === "monthly_fee" || row.feeType === "admission"
            ? "Paid"
            : "Pending"}
        </Badge>
      ),
      reorder: false,
      button: true,
    },
    {
      name: "Invoice",
      selector: (row) => (
        <IconButton
          className={classes.pdfButton}
          onClick={() => downloadInvoice(row)}
        >
          <PictureAsPdfIcon />
        </IconButton>
      ),

      center: true,
    },
    {
      name: "Paid On",
      selector: (row) =>
        moment(row.timestamp.seconds * 1000).format(" MMMM-DD- YY hh:mm a"),

      reorder: false,
      right: true,
    },
  ];

  const handleSearch = (e) => {
    setQ(e.target.value);
  };
  useEffect(() => {
    const value = transactions.filter((item) =>
      item.studentName.toLowerCase().includes(q)
    );
    const timeout = setTimeout(() => {
      setFilteredData(value);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [q, transactions]);

  const hanldeDateChange = (startDate) => {
    if (!startDate) {
      setFilteredData(transactions);
      return;
    }

    const dateValues = transactions.filter((item) => {
      return (
        moment(item.timestamp.seconds * 1000).isSameOrAfter(
          moment(startDate[0]).startOf("day")
        ) &&
        moment(item.timestamp.seconds * 1000).isSameOrBefore(
          moment(startDate[1]).endOf("day")
        )
      );
    });
    setFilteredData(dateValues);
  };
  const styles = { width: 900 };
  return (
    <Box mt={2}>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid xs={12} md={3}>
            <Widget type="todaysPayment" />
          </Grid>
          <Grid xs={12} md={3}>
            <Widget type="sevendaysPayment" />
          </Grid>
          <Grid xs={12} md={3}>
            <Widget type="monthPayment" />
          </Grid>
          <Grid xs={12} md={3}>
            <Widget type="TotalPayment" />
          </Grid>
        </Grid>
      </Box>
      <div className={classes.csvFileParent}>
        <Box display="flex" alignItems="center" className={classes.typo}>
          <Typography variant="h5"> Transactions </Typography>
        </Box>
        <CSVLink
          data={transactions}
          filename="students.csv"
          target="_blank"
          className={classes.csvFile}
        >
          Export CSV
        </CSVLink>
      </div>

      <Grid container spacing={2} className={classes.search}>
        <Grid item md={6} xs={12}>
          <DateRangePicker
            size="lg"
            placeholder="Filter by Date"
            style={styles}
            onChange={hanldeDateChange}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            label="Search By Name"
            variant="outlined"
            size="small"
            fullWidth
            value={q}
            onChange={handleSearch}
          />
        </Grid>
      </Grid>

      <Paper elevation={3}>
        <DataTable
          columns={columns}
          data={FilteredData}
          striped
          highlightOnHover
          defaultSortAsc={false}
          progressPending={pending}
          progressComponent={<Loader />}
          pagination
        />
      </Paper>
    </Box>
    // <Loader/>
  );
};
export default Transactions;
