import {
  Box,
  Button,
  Card,
  ListItem,
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
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { paths } from "../Routes/paths";
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
var oneThousandroll = 1000;
var twoThousandroll = 2000;
var threeThousandroll = 3000;
var fourThousandroll = 4000;
var fiveThousandroll = 5000;
var sixThousandroll = 6000;
var sevenThousandroll = 7000;
var eightThousandroll = 8000;
var NineThousandroll = 9000;
var tenThousandroll = 10000;
const Create_Signup = () => {
  const classes = usestyles();
  const dispatch = useDispatch();
  const [course, setCourse] = useState([]);
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const validationSchema = yup.object({});

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

  const formik = useFormik({
    initialValues: {
      name: "",
      ClassName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addDoc(collection(db, "Students"), {
          ...values,
          rollNo:
            values.ClassName === "Ist Standard"
              ? oneThousandroll++
              : values.ClassName === "2nd Standard"
              ? twoThousandroll++
              : values.ClassName === "3rd Standard"
              ? threeThousandroll++
              : values.ClassName === "4th Standard"
              ? fourThousandroll++
              : values.ClassName === "5th Standard"
              ? fiveThousandroll++
              : values.ClassName === "6th Standard"
              ? sixThousandroll++
              : values.ClassName === "7th Standard"
              ? sevenThousandroll++
              : values.ClassName === "8th Standard"
              ? eightThousandroll++
              : values.ClassName === "9th Standard"
              ? NineThousandroll++
              : tenThousandroll++,
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

  return (
    <>
      <Box className={classes.Signup_Box}>
        <Typography variant="h5" className={classes.signup_typo}>
          Register Student
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
                <MenuItem value={course.name}>{course.name}</MenuItem>
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
            {/* {users.map((item) => (
              <Box>
                <Card>
                  <ListItem>Name: {item.name}</ListItem>
                  <ListItem>Email: {item.email}</ListItem>
                  <ListItem>role: {item.role} </ListItem>
                </Card>
              </Box>
            ))} */}
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
                Register
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Create_Signup;

// const arr = [1, 2, 3, 4];
// const new_arr = arr.map((a) => a++);
// console.log(new_arr);
