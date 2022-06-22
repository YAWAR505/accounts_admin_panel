import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { MoreVertRounded, Search } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import RangePicker from "react-range-picker";
import moment from "moment";
import { CSVLink } from "react-csv";
import TransactionPdf from "./TransactionPdf";
import Loader from "../Constants/Loader";
import clsx from "clsx";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
const useStyles = makeStyles(() => ({
  root: {
    padding: 0,

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
    marginTop: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "start",
  },
}));
const Transactions = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [q, setQ] = useState("");
  const pdfRef = useRef(null);
  useEffect(() => {
    const q = query(collection(db, "PayFee"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const Transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(Transactions);
    });
    return () => unsubscribe();
  }, []);

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
        <Button
          size="small"
          style={{
            backgroundColor: row.feeType === "monthly_fee" ? "green" : "red",
          }}
        >
          {row.feeType === "monthly_fee" ? "Paid" : "Pending"}
        </Button>
      ),
      reorder: false,
      button: true,
    },
    {
      name: "Invoice",
      selector: (row) => <TransactionPdf row={row} />,
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
    const value = transactions.filter(
      (item) => item.studentName.toLowerCase().includes(q)
    );
    setFilteredData(value);
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

  const styles = { width: 260 };
  return (
    <Paper elevation={2}>
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
      <Card className={clsx(classes.root)}>
        <CardContent>
          <Grid container spacing={2} className={classes.search}>
            <Grid item md={6} xs={12}>
              {/* <TextField
                label="Search"
                variant="outlined"
                size="small"
             /> */}
              <DateRangePicker
                size="lg"
                placeholder="Filter by Date"
                style={styles}
                onChange={hanldeDateChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={q}
                onChange={handleSearch}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <DataTable
        columns={columns}
        data={FilteredData}
        striped
        highlightOnHover
        defaultSortFieldId={1}
        pagination
      />
    </Paper>
    // <Loader/>
  );
};
export default Transactions;
