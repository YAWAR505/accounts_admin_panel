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
  doc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { CLASS_DATA } from "../Dashboard/classData";
import { paths } from "../Routes/paths";
import { toast, ToastContainer } from "react-toastify";

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
  const [Course, setCourse] = useState([]);
  const [initialValues, setInitialValues] = useState({
    class: "",
    AdmissionFee: "",
    monthelyFee: "",
    Class_Code: "",
  });
  const location = useLocation();
  const [state] = useState(location.state);
  const param = useParams();

  useEffect(() => {
    setInitialValues({
      ...formik.values,
      class: state?.class,
      AdmissionFee: state?.AdmissionFee,
      monthelyFee: state?.monthelyFee,
      Class_Code: state?.Class_Code,
    });
  }, [state, param]);
  useEffect(() => {
    const q = query(collection(db, "addCourse"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourse(tasks);
    });
    return () => unsubscribe();
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      const year = new Date().getFullYear();
      try {
        toast.dark(
          state ? "Class Updated Successful" : " Class Added Successful"
        );

        state
          ? await updateDoc(doc(db, "addCourse", param.id), {
              class: values.class,
              AdmissionFee: values.AdmissionFee,
              monthelyFee: values.monthelyFee,
              Class_Code: values.Class_Code,
            })
          : await addDoc(collection(db, "addCourse"), {
              ...values,
              s_id: Course.length,
              timestamp: Timestamp.now(),
            });
      } catch (e) {
        Error(e);
      }
      navigate(paths.getCourses());
      resetForm({ values: "" });
    },
  });
  return (
    <Box className={classes.adduser}>
      <ToastContainer />
      <Typography variant="h5">
        {state ? " Edit Class" : "Create Class"}
      </Typography>
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
          value={formik.values.class}
          // error={formik.touched.coursename && Boolean(formik.errors.coursename)}
          // helperText={formik.touched.coursename && formik.errors.coursename}
        >
          {CLASS_DATA.map((code) => (
            <MenuItem value={code.label}>{code.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          id="AdmissionFee"
          name="AdmissionFee"
          className={classes.fieldsWidth}
          label="Admission Fee"
          type="number"
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.AdmissionFee}
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
          {CLASS_DATA.map((code) => (
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
          {state ? " Update class" : "Add Class"}
        </Button>
      </form>
    </Box>
  );
};

export default Add_Courses;
