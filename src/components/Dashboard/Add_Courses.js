import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { db } from "../../firebase";
import { classCode } from "../Dashboard/classData";
import { v4 as uuid } from "uuid";
const usestyles = makeStyles(() => ({
  adduser: {
    width: "100%",
  },
  fieldsWidth: {
    width: "49%",
    padding: "2px",
  },
  buttons: {
    width: "30%",
    display: "block",
    margin: "0 auto",
    marginTop: "30px",
  },
}));
const Add_Courses = () => {
  const navigate = useNavigate();
  const classes = usestyles();
  const unique_id = uuid();
  const [show, setShow] = useState([]);
  // onChange: (e) => {
  //   alert("hello ");
  //   let AllData = classCode.filter((list) => list.id === e.target.value);
  //   console.log(AllData);
  //   setShow((oldData) => {
  //     return {
  //       ...oldData,
  //       class: AllData[0]?.class,
  //       Class_Code: AllData[0]?.Class_Code,
  //     };
  //   });
  // },
  const formik = useFormik({
    initialValues: {
      class: "",
      AdmitionFee: "",
      monthelyFee: "",
      Class_Code: "",
    },

    onSubmit: async (values, { resetForm }) => {
      // const totalData = values.AdmitionFee + values.monthelyFee * 2;
      resetForm({ values: "" });

      try {
        await addDoc(collection(db, "addCourse"), {
          ...values,
          id: unique_id,
          timestamp: Timestamp.now(),
        });
      } catch (e) {
        Error(e);
      }
      navigate("/courses");
    },
  });
  return (
    <Box className={classes.adduser}>
      <Typography variant="h5"> Add Class</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.fieldsWidth}
          id="class"
          name="class"
          label="Class"
          type="text"
          select
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.coursename}
          // error={formik.touched.coursename && Boolean(formik.errors.coursename)}
          // helperText={formik.touched.coursename && formik.errors.coursename}
        >
          {classCode.map((code) => (
            <MenuItem value={code.Standard}>{code.Standard}</MenuItem>
          ))}
        </TextField>
        <TextField
          id="AdmitionFee"
          name="AdmitionFee"
          className={classes.fieldsWidth}
          label="Admition Fee"
          type="number"
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.AdmitionFee}
          // error={formik.touched.totalFee && Boolean(formik.errors.totalFee)}
          // helperText={formik.touched.totalFee && formik.errors.totalFee}
        />
        <TextField
          id="monthelyFee"
          name="monthelyFee"
          className={classes.fieldsWidth}
          label="Monthely Fee"
          type="number"
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.monthelyFee}
          // error={
          //   formik.touched.semesterFee && Boolean(formik.errors.semesterFee)
          // }
          // helperText={formik.touched.semesterFee && formik.errors.semesterFee}
        />
        <TextField
          id="Class_Code"
          name="Class_Code"
          className={classes.fieldsWidth}
          label="Class Code"
          type="text"
          select
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.Class_Code}
          // error={
          //   formik.touched.semesterFee && Boolean(formik.errors.semesterFee)
          // }
          // helperText={formik.touched.semesterFee && formik.errors.semesterFee}
        >
          {classCode.map((code) => (
            <MenuItem value={code.Code}>{code.Code}</MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          size="large"
          variant="contained"
          className={classes.buttons}
          color="primary"
        >
          Add Class
        </Button>
      </form>
    </Box>
  );
};

export default Add_Courses;
