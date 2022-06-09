import {
  Box,
  Card,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MoreVertRounded } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { paths } from "../Routes/paths";
const useStyles = makeStyles(() => ({
  title: {
    zIndex: 999,
  },
}));
const Create_Courses = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const actionEdit = async (id) => {
    try {
      const netEditElement = data.find((elemnt) => elemnt.id === id);
      navigate(paths.getCourseEdit(id), { state: netEditElement });
    } catch (err) {
      alert(err);
    }
  };

  const actionDelete = async (id) => {
    await deleteDoc(doc(db, "addCourse", id));
    const oneIndex = data.filter((val) => val.id !== id);
    const cloned = [...data];
    cloned.splice(oneIndex, 1);
    setData(cloned);
  };
  useEffect(() => {
    const q = query(collection(db, "addCourse"), orderBy("timestamp", "desc"));
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
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Class Code",
      selector: (row) => row.Class_Code,
      reorder: true,
    },
    {
      name: "Class Name",
      selector: (row) => row.class,
      reorder: true,
    },

    {
      name: "Admission Fee ",
      selector: (row) => row.AdmissionFee,
      reorder: true,
    },
    {
      name: "Per/Monthely Fee",
      selector: (row) => row.monthelyFee,
      reorder: true,
    },
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
  const tableData = {
    columns,
    data,
  };

  return (
    <Box>
      <Card>
        <DataTableExtensions {...tableData} filterPlaceholder={"Search"}>
          <DataTable
            title={
              <Box>
                {"Courses"}
                {
                  <IconButton onClick={addHandler} color="primary">
                    <AddCircleOutlineIcon />
                  </IconButton>
                }
              </Box>
            }
            fixedHeader
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            striped
            highlightOnHover
            pagination
          />
        </DataTableExtensions>
      </Card>
    </Box>
  );
};

export default Create_Courses;
