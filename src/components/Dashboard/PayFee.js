import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import { db } from "../../firebase";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { MONTHS } from "../Constants/months";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,

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
  listItemstext: {
    display: "flex",
    justifyContent: "space-between",
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
const PayFee = () => {
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
  const [saveData, setsaveData] = useState([]);
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
      await addDoc(collection(db, "PayFee"), {
        ...values,
        user_id: saveData.length,
        timestamp: Timestamp.now(),
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
    const q = query(collection(db, "PayFee"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const Transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setsaveData(Transactions);
      const filtedTransaction = Transactions.filter(
        (item) => item.studentName === formik.values.studentName
      );
      setTransactions(filtedTransaction);
    });
    return () => unsubscribe();
  }, [formik.values.studentName, formik.values.feeType]);
  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Pay fee" />
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
                <ListItem className={classes.listItemstext}>
                  <Typography variant="h6">Name:-</Typography>
                  <Typography>{item.name}</Typography>
                </ListItem>
                <ListItem className={classes.listItemstext}>
                  <Typography variant="h6"> Email:- </Typography>
                  <Typography> {item.email} </Typography>
                </ListItem>
                <ListItem className={classes.listItemstext}>
                  <Typography variant="h6">Role:- </Typography>
                  <Typography>{item.role} </Typography>
                </ListItem>
                <ListItem className={classes.listItemstext}>
                  <Typography variant="h6">Address:- </Typography>
                  <Typography>{item.userDetails.Address} </Typography>
                </ListItem>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem className={classes.listItemstext}>
                  <Typography variant="h6">Phone Number:- </Typography>
                  <Typography>{item.userDetails.PhoneNumber} </Typography>
                </ListItem>
                <ListItem className={classes.listItemstext}>
                  <Typography variant="h6">Father Name:- </Typography>
                  <Typography>{item.userDetails.fatherName} </Typography>
                </ListItem>
                {studentData.map((item) => (
                  <>
                    <ListItem className={classes.listItemstext}>
                      <Typography variant="h6">Roll Number:- </Typography>
                      <Typography>{item.rollNo} </Typography>
                    </ListItem>
                    <ListItem className={classes.listItemstext}>
                      <Typography variant="h6">Class Name:- </Typography>
                      <Typography>{item.ClassName} </Typography>
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
                        amount = course.AdmissionFee;
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
                    id="Month"
                    label="Month"
                    name="Month"
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
export default PayFee;
