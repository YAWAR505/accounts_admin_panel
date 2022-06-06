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

const UsersList = () => {
  const [selected, setSelected] = useState(undefined);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [user, setUser] = useState([]);
  const actionMenuOpenHandler = (record) => (e) => {
    setSelected(record);
    setMenuAnchor(e.currentTarget);
  };
  const navigate = useNavigate();
  const addHandler = () => {
    navigate("/user");
  };
  useEffect(() => {
    const q = query(collection(db, "Users"));
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
      selector: (row) => row.uid,
      sortable: true,
      reorder: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: false,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
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
              {"Users"}{" "}
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

export default UsersList;
