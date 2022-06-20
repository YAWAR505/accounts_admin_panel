import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { paths } from "../Routes/paths";
import moment from "moment";
const usestyles = makeStyles(() => ({
  Signup_Box: {
    width: "100%",
  },
  signup_typo: {
    color: "#029904",
  },
  formbox: {
    width: "100%",
  },
  width: {
    width: "49%",
    padding: "2px",
  },
  manuitems: {
    display: "flex",
  },
}));

const Gender = [{ label: "Male" }, { label: "Female" }];
const Create_Signup = () => {
  const classes = usestyles();
  const [course, setCourse] = useState([]);
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [setusersData, setUsersData] = useState([]);
  const [state] = useState(location.state);
  const param = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    ClassName: "",
  });
  const validationSchema = yup.object({});

  useEffect(() => {
    setInitialValues({
      ...formik.values,
      name: state?.name,
      ClassName: state?.ClassName,
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

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(tasks);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "Students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(tasks);
    });
    return () => unsubscribe();
  }, []);
  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, "0");
  }
  console.log(students);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const studentRef = collection(db, "Students");
      const qroll = query(
        studentRef,
        where("ClassName", "==", values.ClassName)
      );
      const querySnap = await getDocs(qroll);
      const year = new Date().getFullYear();
      const short = year.toString().slice(-2);
      console.log(short);
      try {
        state
          ? await updateDoc(doc(db, "Students", param.id), {
              name: values.name,
              ClassName: values.ClassName,
            })
          : await addDoc(collection(db, "Students"), {
              ...values,
              rollNo: parseInt(values.ClassName) * 1000 + querySnap.size + 1,
              S_id: `PS${short}${addLeadingZeros(students.length, 2)}`,

              user_id: students.length,
              timestamp: Timestamp.now(),
            });
        resetForm({ values: "" });
        navigate(paths.getStudents());
      } catch (e) {
        Error(e);
      }
    },
  });
  useEffect(() => {
    const FilteredUsers = users.filter(
      (item) => item.name === formik.values.name
    );
    setUsersData(FilteredUsers);
  }, [formik.values.name, users]);
  return (
    <>
      <Box className={classes.Signup_Box}>
        <Typography variant="h5" className={classes.signup_typo}>
          {state ? "Edit Student " : "Register Student "}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.formbox}>
            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              select
              margin="normal"
              variant="outlined"
              className={classes.width}
              onChange={formik.handleChange}
              value={formik.values.name}
              // error={formik.touched.name && Boolean(formik.errors.name)}
              // helperText={formik.touched.name && formik.errors.name}
            >
              {users.map((course) => (
                <MenuItem
                  value={course.name}
                  disabled={students.some((item) => item.name === course.name)}
                >
                  {course.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="ClassName"
              name="ClassName"
              label=" Class Name "
              type="text"
              margin="normal"
              select
              variant="outlined"
              className={classes.width}
              onChange={formik.handleChange}
              value={formik.values.ClassName}
              // error={formik.touched.course && Boolean(formik.errors.course)}
              // helperText={formik.touched.course && formik.errors.course}
            >
              {course.map((course) => (
                <MenuItem value={course.class}>{course.class}</MenuItem>
              ))}
            </TextField>
            {setusersData.map((item) => (
              <CardContent>
                <CardHeader title="Student Details" />
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <ListItem>
                      <ListItemText> Name:- </ListItemText>
                      <ListItemText> {item.name} </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText> Email:- </ListItemText>
                      <ListItemText> {item.email} </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Role:- </ListItemText>
                      <ListItemText>{item.role} </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Address:- </ListItemText>
                      <ListItemText>{item.userDetails.Address} </ListItemText>
                    </ListItem>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <ListItem>
                      <ListItemText>Phone Number:- </ListItemText>
                      <ListItemText>
                        {item.userDetails.PhoneNumber}{" "}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Father Name:- </ListItemText>
                      <ListItemText>
                        {item.userDetails.fatherName}{" "}
                      </ListItemText>
                    </ListItem>
                  </Grid>
                </Grid>
              </CardContent>
            ))}

            <Box
              sx={{
                marginTop: "50px",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                {state ? "update" : "Register"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Create_Signup;
