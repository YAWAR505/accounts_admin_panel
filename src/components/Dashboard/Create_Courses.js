import { Box, Card, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

const Create_Courses = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  // console.log(total, "test");
  useEffect(() => {
    const q = query(collection(db, "addCourse"));
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
    navigate("/add_course");
  };

  const columns = [
    {
      name: "Course Id",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Class Name",
      selector: (row) => row.class,
      sortable: true,
      reorder: true,
    },

    {
      name: "Admition Fee",
      selector: (row) => row.AdmitionFee,
      reorder: true,
    },
    {
      name: "Per/Monthely Fee",
      selector: (row) => row.monthelyFee,
      reorder: true,
    },
    {
      name: "Class Code",
      selector: (row) => row.Class_Code,
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
              {"Courses"}
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
          data={data}
          defaultSortFieldId={1}
          striped
          highlightOnHover
          pagination
        />
      </Card>
    </Box>
  );
};

export default Create_Courses;
