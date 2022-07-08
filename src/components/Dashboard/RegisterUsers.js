import React, { useEffect, useState } from "react";
import clsx from "clsx";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import * as Yup from "yup";
import { Formik, getIn } from "formik";
import {
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
  Box,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { hanldSignup } from "../../redux/Action";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { paths } from "../Routes/paths";
import { toast } from "react-toastify";
const ROLL_TYPE = [
  {
    label: "Student",
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: "100vh",
  },
  actions: {
    justifyContent: "center",
  },
  phone: {
    width: "100%",
  },
}));

const Users = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    userDetails: {
      fatherName: "",
      motherName: "",
      PhoneNumber: "",
      Address: "",
    },
  };
  const location = useLocation();
  const [state] = useState(location.state);
  const param = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setInitialValues({
  //     firstName: state?.fatherName,
  //     lastName: state?.lastName,
  //     email: state?.email,
  //     password: state?.password,
  //     confirmPassword: state?.confirmPassword,
  //     role: state?.role,
  //     userDetails: {
  //       fatherName: state?.fatherName,
  //       motherName: state?.motherName,
  //       PhoneNumber: state?.PhoneNumber,
  //       Address: state?.Address,
  //     }
  //   });
  // }, [state, param]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmShowPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box className={clsx(classes.root)}>
      <CardHeader title="Register User" />
      <Formik
        initialValues={{
          ...initialValues,
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Name is required"),
          lastName: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Please enter a valid email")
            .required("Email is required"),
          role: Yup.string().required("Role is required"),
          password: Yup.string()
            .required("Please enter your password")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case Character"
            ),
          confirmPassword: Yup.string()
            .required("Please enter the password again")
            .oneOf([Yup.ref("password"), null], "Passwords didn't match"),
          userDetails: Yup.object().shape({
            fatherName: Yup.string().required("Father Name is required"),
            motherName: Yup.string().required("Mother Name  is required"),
            PhoneNumber: Yup.string().required("Phone Number  is required"),
            Address: Yup.string().required("Mother Name  is required"),
          }),
        })}
        onSubmit={(values, { resetForm }) => {
          try {
            dispatch(hanldSignup(values.email, values.password, values));
            toast.success("User Register Successful");
          } catch (e) {
            Error(e);
          }
          navigate(paths.getUsersList());
          resetForm({ values: "" });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          isValid,
          dirty,
          touched,
          values,
        }) => (
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    required
                    helperText={touched.firstName && errors.firstName}
                    label="First Name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    required
                    helperText={touched.lastName && errors.lastName}
                    label="Last Name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                    label="Role"
                    name="role"
                    select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.role}
                    variant="outlined"
                  >
                    {ROLL_TYPE.map((item) => (
                      <MenuItem value={item.label}>{item.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    required
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label="Confirm Password"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleConfirmShowPassword}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardHeader title="User Details" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      getIn(touched, "userDetails.fatherName") &&
                      getIn(errors, "userDetails.fatherName")
                    )}
                    fullWidth
                    required
                    helperText={
                      getIn(touched, "userDetails.fatherName") &&
                      getIn(errors, "userDetails.fatherName")
                    }
                    label="Father Name"
                    name="userDetails.fatherName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.userDetails.fatherName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      getIn(touched, "userDetails.motherName") &&
                      getIn(errors, "userDetails.motherName")
                    )}
                    fullWidth
                    required
                    helperText={
                      getIn(touched, "userDetails.motherName") &&
                      getIn(errors, "userDetails.motherName")
                    }
                    label="Mother Name"
                    name="userDetails.motherName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.userDetails.motherName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <PhoneInput
                    country="in"
                    enableSearch={true}
                    specialLabel=""
                    value={values.userDetails.PhoneNumber}
                    onChange={(phone) =>
                      setFieldValue("userDetails.PhoneNumber", phone)
                    }
                    inputStyle={{ width: "100%", height: "55px" }}
                    // error={Boolean(
                    //     getIn(touched, "userDetails.Address") &&
                    //     getIn(errors, "userDetails.Address")
                    // )}
                    // helperText={
                    //   getIn(touched, "userDetails.PhoneNumber") &&
                    //   getIn(errors, "userDetails.PhoneNumber")
                    // }
                    isValid={(value, country) => {
                      if (value.match(/12345/)) {
                        return "Invalid value: " + value + ", " + country.name;
                      } else if (value.match(/1234/)) {
                        return false;
                      } else {
                        return true;
                      }
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      getIn(touched, "userDetails.Address") &&
                      getIn(errors, "userDetails.Address")
                    )}
                    fullWidth
                    required
                    helperText={
                      getIn(touched, "userDetails.Address") &&
                      getIn(errors, "userDetails.Address")
                    }
                    label="Address"
                    name="userDetails.Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.userDetails.Address}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                color="primary"
                disabled={Boolean(!isValid)}
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Users;
