import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import { db } from "../../firebase";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { MONTHS } from "../Constants/months";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: "100%",
    width: "100%",
  },
  actions: {
    justifyContent: "flex-end",
    marginTop: "40px",
  },
  verify: {
    justifyContent: "center",
    marginTop: "20px",
  },
}));

const FEE_TYPE_ADMISSION = "admission";
const FEE_TYPE_FINE = "fine";
const FEE_TYPE_MONTHLY_FEE = "monthly_fee";
const FEE_TYPE_DUE = "due";

const FEE_TYPES = [
  { value: FEE_TYPE_ADMISSION, label: "Admission" },
  { value: FEE_TYPE_FINE, label: "Fine" },
  { value: FEE_TYPE_MONTHLY_FEE, label: "Monthly Fee" },
  { value: FEE_TYPE_DUE, label: "Due" },
];
const Transactions = () => {
  const classes = useStyles();
  const [course, setCourse] = useState([]);
  const [student, setStudent] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [users, setUsers] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [setusersData, setUsersData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isverify, setIsVerify] = useState(false);
  const [isMonth, setIsMonth] = useState(false);
  const [transactions, setTransactions] = useState([]);
  console.log(transactions, "transactions");
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
    const q = query(collection(db, "Students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudent(tasks);
    });
    return () => unsubscribe();
  }, []);
  const validationSchema = yup.object({
    class: yup.string("Please select Classs").required("Class is Required"),

    studentName: yup
      .string("Please Select Student")
      .required(" Student is required"),
  });
  const formik = useFormik({
    initialValues: {
      class: "",
      studentName: "",
      feeType: "",
      Amount: "",
      Month: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm({ values: "" });
      await addDoc(collection(db, "Transactions"), {
        ...values,
      });
      setIsVerify(false);
    },
  });
  useEffect(() => {
    const filtered = student.filter(
      (item) => item.ClassName === formik.values.class
    );
    const courseFilteredData = course.filter(
      (item) => item.class === formik.values.class
    );
    setFilteredCourses(courseFilteredData);
    setFilterData(filtered);
  }, [formik.values.class, student, course]);

  useEffect(() => {
    const FilteredUsers = users.filter(
      (item) => item.name === formik.values.studentName
    );
    const filtered = student.filter(
      (item) => item.name === formik.values.studentName
    );
    setStudentData(filtered);
    setUsersData(FilteredUsers);
  }, [formik.values.studentName, formik.values.feeType, users, student]);
  const handleverify = () => {
    setIsVerify(true);
  };
  useEffect(() => {
    const q = query(collection(db, "Transactions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const Transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filtedTransaction = Transactions.filter(
        (item) => item.studentName === formik.values.studentName
      );
      setTransactions(filtedTransaction);
    });
    return () => unsubscribe();
  }, [formik.values.studentName, formik.values.feeType]);
  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Transactions" />
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                id="class"
                name="class"
                label="Class "
                type="text"
                margin="normal"
                select
                disabled={isverify}
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.class}
                // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                // helperText={formik.touched.firstName && formik.errors.firstName}
              >
                {course.map((course) => (
                  <MenuItem value={course.class}>{course.class}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="studentName"
                name="studentName"
                label="Student Name"
                type="text"
                disabled={isverify}
                select
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.studentName}
                // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                // helperText={formik.touched.firstName && formik.errors.firstName}
              >
                {filterData.map((course) => (
                  <MenuItem value={course.name}>{course.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>

        {setusersData.map((item) => (
          <CardContent>
            <CardHeader title="User Details" />

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
                  <ListItemText>{item.userDetails.PhoneNumber} </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Father Name:- </ListItemText>
                  <ListItemText>{item.userDetails.fatherName} </ListItemText>
                </ListItem>
                {studentData.map((item) => (
                  <>
                    <ListItem>
                      <ListItemText>Roll Number:- </ListItemText>
                      <ListItemText>{item.rollNo} </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Class Name:- </ListItemText>
                      <ListItemText>{item.ClassName} </ListItemText>
                    </ListItem>
                  </>
                ))}
              </Grid>
            </Grid>
            <CardActions className={classes.verify}>
              <Button
                variant="contained"
                color={!isverify ? "secondary" : "primary"}
                onClick={handleverify}
              >
                {!isverify ? "Verify" : "Verified"}
              </Button>
            </CardActions>
          </CardContent>
        ))}
        {!!isverify ? (
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  id="feeType"
                  name="feeType"
                  label="Fee Type"
                  type="text"
                  select
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    const targetValue = e.target.value;
                    const course = filteredCourses[0];
                    let amount = 0;
                    switch (targetValue) {
                      case FEE_TYPE_ADMISSION:
                        setIsMonth(false);
                        amount = course.AdmitionFee;
                        break;
                      case FEE_TYPE_MONTHLY_FEE:
                        setIsMonth(true);
                        amount = course.monthelyFee;
                        break;
                      case FEE_TYPE_FINE:
                        setIsMonth(false);
                        amount = 0;
                        break;
                      case FEE_TYPE_DUE:
                        setIsMonth(false);
                        amount = 0;
                        break;
                      default:
                        return amount;
                    }
                    formik.setValues({
                      ...formik.values,
                      feeType: targetValue,
                      Amount: amount,
                    });
                  }}
                  value={formik.values.feeType}
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                >
                  {FEE_TYPES.map((fee) => (
                    <MenuItem
                      value={fee.value}
                      disabled={transactions.some(
                        (item) => item.feeType === fee.value
                      )}
                    >
                      {fee.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {isMonth ? (
                <Grid item md={6} xs={12}>
                  <TextField
                    id="month"
                    label="Month"
                    type="test"
                    select
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    value={formik.values.Month}
                    // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    // helperText={formik.touched.firstName && formik.errors.firstName}
                  >
                    {MONTHS.map((month) => (
                      <MenuItem value={month.value}>{month.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              ) : null}
              <Grid item md={6} xs={12}>
                <TextField
                  id="Amount"
                  name="Amount"
                  label="Amount"
                  type="number"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.Amount}
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
            </Grid>
            <CardActions className={classes.actions}>
              <Button type="submit" variant="contained" color="primary">
                Mark as Paid
              </Button>
            </CardActions>
          </CardContent>
        ) : null}
      </form>
    </Card>
  );
};
export default Transactions;
