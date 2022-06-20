import {
  Box,
  Card,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { MoreVertRounded } from "@mui/icons-material";
import { paths } from "../Routes/paths";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
const useStyles = makeStyles(() => ({
  typo: {
    marginLeft: "10px",
  },
  search: {
    marginTop: "10px",
  },
}));
const Create_Student = () => {
  const [selected, setSelected] = useState(undefined);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [user, setUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [q, setQ] = useState("");
  const [FilteredData, setFilteredData] = useState([]);
  const classes = useStyles();
  const actionMenuOpenHandler = (record) => (e) => {
    setSelected(record);
    setMenuAnchor(e.currentTarget);
  };
  const navigate = useNavigate();
  const addHandler = () => {
    navigate(paths.getRegisterStudents());
  };
  useEffect(() => {
    const q = query(collection(db, "Students"));
    const unsubscribe = onSnapshot(q, (Snapshot) => {
      const tasks = Snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser(tasks);
    });
    return () => unsubscribe();
  }, []);

  const actionDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDoc(doc(db, "Students", id));
        const oneIndex = user.filter((val) => val.id === id);
        const cloned = [...user];
        cloned.splice(oneIndex, 1);
        setUser(cloned);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const actionEdit = async (id) => {
    try {
      const netEditElement = user.find((elemnt) => elemnt.id === id);
      navigate(paths.getRegisterStudentsEdit(id), { state: netEditElement });
    } catch (err) {
      alert(err);
    }
  };
  const columns = [
    {
      name: "U-id",
      selector: (row) => row.S_id,
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

    // {
    //   name: "Fee Status",
    //   selector: (row) => (
    //     <Typography variant="subtitle2" color="primary">
    //       Paid
    //     </Typography>
    //   ),
    //   reorder: false,
    // },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <IconButton onClick={() => actionEdit(row?.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => actionDelete(row?.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const handleSearch = (e) => {
    setQ(e.target.value);
  };
  useEffect(() => {
    const value = user.filter((item) => item.name.toLowerCase().includes(q));
    setFilteredData(value);
  }, [q, user]);
  return (
    <Box>
      <Card>
        <Box display="flex" alignItems="center" className={classes.typo}>
          <Typography variant="h5"> Students </Typography>
          <IconButton onClick={addHandler} color="primary">
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
        <DataTable
          actions={
            <Box className={classes.search}>
              <TextField
                label="Search"
                variant="outlined"
                value={q}
                onChange={handleSearch}
              />
            </Box>
          }
          columns={columns}
          data={FilteredData}
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
