import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MoreVertRounded } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

import "react-data-table-component-extensions/dist/index.css";
import { paths } from "../Routes/paths";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import Loader from "../Constants/Loader";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(() => ({
  title: {
    zIndex: 999,
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
  },
  vertItem:{
    display: "flex",
    flexDirection: "column",
   
  }
}));
const Create_Courses = () => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const classes = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pending, setPending] = useState(true)
  const [q, setQ] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const actionEdit = async (id) => {
    try {
      const netEditElement = data.find((elemnt) => elemnt.id === id);
      navigate(paths.getCourseEdit(id), { state: netEditElement });
    } catch (err) {
      alert(err);
    }
  };

  const actionDelete = async (id) => {
    setOpen(true);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDoc(doc(db, "addCourse", id));
        const oneIndex = data.filter((val) => val.id == id);
        const cloned = [...data];
        cloned.splice(oneIndex, 1);
        setData(cloned);
        setOpen(false);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  useEffect(() => {
    const q = query(collection(db, "addCourse"),orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const getCourse = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(getCourse);
    });
    return () => unsubscribe();
  }, []);

  const addHandler = () => {
    navigate(paths.getCourseAdd());
  };

  const columns = [
    {
      name: "Course Id",
      selector: (row) => row.s_id,
      sortable: true,
      reorder: false,
    },
    {
      name: "Class Code",
      selector: (row) => row.Class_Code,
      reorder: false,
    },
    {
      name: "Class Name",
      selector: (row) => row.class,
      reorder: false,
    },

    {
      name: "Admission Fee ",
      selector: (row) => " ₹ " + numberWithCommas(row.AdmissionFee.toFixed(2)),
      reorder: false,
    },
    {
      name: "Monthly Fee",
      selector: (row) => " ₹ " + numberWithCommas(row.monthelyFee.toFixed(2)),
      reorder: false,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <IconButton
            aria-label="more"
            onClick={handleClick}
            aria-haspopup="true"
            aria-controls="long-menu"
          >
            <MoreVertRounded />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            onClose={handleClose}
            open={isOpen}
            style={{     width: '10ch',}}
            elevation={2}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'bottom', vertical: 'top' }}
          >
            {/* <MenuItem className={classes.vertItem} onClick={handleClose}> */}
              <IconButton onClick={() => actionEdit(row?.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => actionDelete(row?.id)}>
                <DeleteIcon />
              </IconButton>
            {/* </MenuItem> */}
          </Menu>
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
    const value = data.filter((item) =>
      item.Class_Code.toLowerCase().includes(q)
    );
    const timeout = setTimeout(() => {
    setFilteredData(value);
    setPending(false);
  }, 1000);
  return () => clearTimeout(timeout);
  }, [q, data]);


  return (
    <Box>
     
        <div className={classes.csvFileParent}>
          <Box display="flex" alignItems="center" className={classes.typo}>
            <Typography variant="h5"> Courses </Typography>
            <IconButton onClick={addHandler} color="primary">
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>

          <CSVLink
            data={data}
            filename="students.csv"
            target="_blank"
            className={classes.csvFile}
          >
            Export CSV
          </CSVLink>
        </div>
        <Box className={classes.search}>
              {/* <RangePicker onDateChanges={onDateChanges} /> */}
              <TextField
                label="Search"
                variant="outlined"
                value={q}
                onChange={handleSearch}
              />
            </Box>
        <Paper elevation={3}>
        <DataTable
          columns={columns}
          data={FilteredData}
          striped
          progressPending={pending}
          progressComponent={ <CircularProgress/> }
          highlightOnHover
          pagination
        />
        </Paper>
    
    </Box>
  );
};

export default Create_Courses;
