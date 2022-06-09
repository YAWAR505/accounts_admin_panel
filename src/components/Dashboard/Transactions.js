import { Box, Button, Card, IconButton, Typography } from "@material-ui/core";
import { MoreVertRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

const Transactions = () => {
  const [selected, setSelected] = useState(undefined);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const actionMenuOpenHandler = (record) => (e) => {
    setSelected(record);
    setMenuAnchor(e.currentTarget);
  };
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
      name: "U-id",
      selector: (row) => row.id,
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
      name: "Actions",
      cell: (record) => (
        <IconButton onClick={actionMenuOpenHandler(record)}>
          <MoreVertRounded />
        </IconButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <Box>
      <Card>
        <DataTable
          title={"Transactions"}
          columns={columns}
          data={transactions}
          striped
          highlightOnHover
          defaultSortFieldId={1}
          pagination
        />
      </Card>
    </Box>
  );
};
export default Transactions;
