import {
  Box,
  Card,
  CircularProgress,
  Grid,
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
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { MoreVertRounded } from "@mui/icons-material";
import { paths } from "../Routes/paths";
import "react-data-table-component-extensions/dist/index.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import Loader from "../Constants/Loader";
const useStyles = makeStyles(() => ({
  typo: {
    marginLeft: "10px",
  },
  search: {
    marginTop: "10px",
    display: "flex",
    width: "55%",
    marginBottom: "10px",
    alignItems: "center",
    float: "right"
  },
  vertItem: {},
}));
const Create_Student = () => {
  const [user, setUser] = useState([]);
  const [q, setQ] = useState("");
  const [FilteredData, setFilteredData] = useState([]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState([]);
  const [pending, setPending] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const addHandler = () => {
    navigate(paths.getRegisterStudents());
  };
  useEffect(() => {
    const q = query(collection(db, "Students"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (Snapshot) => {
      const tasks = Snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser(tasks);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "addCourse"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourse(tasks);
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
      name: "Actions",
      selector: (row) => (
        <>
          <IconButton
            aria-label="more"
            onClick={handleClick}
            aria-expanded={isOpen ? "true" : undefined}
            aria-haspopup="true"
            aria-controls="long-menu"
          >
            <MoreVertRounded />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            onClose={handleClose}
            aria-expanded={isOpen ? "true" : undefined}
            open={isOpen}
            style={{ width: "15ch" }}
            elevation={2}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <IconButton onClick={() => actionEdit(row?.id)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => actionDelete(row?.id)}>
              <DeleteIcon />
            </IconButton>
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
    const value = user.filter((item) => item.name.toLowerCase().includes(q));
    setFilteredData(value);
  }, [q, user]);
  const handleSearchByclass = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const value = user.filter((item) =>
      item.ClassName.toLowerCase().includes(search)
    );
    const timeout = setTimeout(() => {
      setFilteredData(value);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search, user]);
  return (
    <Box>
      <Box display="flex" alignItems="center" className={classes.typo}>
        <Typography variant="h5"> Students </Typography>
        <IconButton onClick={addHandler} color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2} className={classes.search}>
        <Grid item md={6} xs={12}>
          <TextField
            label="Search By Name"
            variant="outlined"
            size="small"
            value={q}
            fullWidth
            onChange={handleSearch}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            label="Search by Class"
            variant="outlined"
            size="small"
            value={search}
            fullWidth
            select
            onChange={handleSearchByclass}
          >
            {course.map((course) => (
              <MenuItem value={course.class}>{course.class}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Paper elevation={3}>
        <DataTable
          columns={columns}
          data={FilteredData}
          defaultSortAsc={false}
          progressPending={pending}
          progressComponent={<Loader />}
          striped
          highlightOnHover
          pagination
        />
      </Paper>
    </Box>
  );
};

export default Create_Student;
