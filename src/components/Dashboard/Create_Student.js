import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { MoreVertRounded } from "@mui/icons-material";

const Create_Student = () => {
  const [selected, setSelected] = useState(undefined);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [user, setUser] = useState([]);
  const actionMenuOpenHandler = (record) => (e) => {
    setSelected(record);
    setMenuAnchor(e.currentTarget);
  };
  const navigate = useNavigate();
  const addHandler = () => {
    navigate("/add_user");
  };
  useEffect(() => {
    const q = query(collection(db, "Students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser(tasks);
    });
    return () => unsubscribe();
  }, []);
  const columns = [
    {
      name: "U-id",
      selector: (row) => row.user_id,
      sortable: true,
      reorder: false,
    },
    {
      name: "Roll No",
      selector: (row) => row.rollNo,
      sortable: true,
      reorder: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      reorder: false,
    },

    {
      name: "Class",
      selector: (row) => row.ClassName,
      reorder: false,
    },

    {
      name: "Fee Status",
      selector: (row) => (
        <Typography variant="subtitle2" color="primary">
          Pending
        </Typography>
      ),
      right: true,
      reorder: false,
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
          title={
            <div>
              {"Students"}
              {
                <IconButton
                  onClick={addHandler}
                  color="primary"
                  // id={generateAddButtonId(moduleName)}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              }
            </div>
          }
          columns={columns}
          data={user}
          striped
          highlightOnHover
          defaultSortFieldId={1}
          pagination
        />
      </Card>
    </Box>
  );
};

export default Create_Student;
