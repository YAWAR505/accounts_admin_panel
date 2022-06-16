import React from "react";
import clsx from "clsx";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import * as Yup from "yup";
import { Formik, getIn } from "formik";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { hanldSignup } from "../../redux/Action";
import { Navigate, useNavigate } from "react-router-dom";
import { paths } from "../Routes/paths";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: "100%",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    name: "",
    role: "",
    userDetails: {
      fatherName: "",
      motherName: "",
      PhoneNumber: "",
      Address: "",
    },
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Register User" />
      <Divider />

      <Formik
        initialValues={{
          ...initialValues,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
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
          userDetails: Yup.object().shape({
            fatherName: Yup.string().required("Father Name is required"),
            motherName: Yup.string().required("Mother Name  is required"),
            PhoneNumber: Yup.string().required("Phone Number  is required"),
            Address: Yup.string().required("Mother Name  is required"),
          }),

          //   confirmPassword: Yup.string()
          //     .required("Please enter the password again")
          //     .oneOf([Yup.ref("password"), null], "Passwords didn't match"),
        })}
        onSubmit={(values, { resetForm }) => {
          try {
            dispatch(hanldSignup(values.email, values.password, values));
            resetForm({ values: "" });
          } catch (e) {
            Error(e);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
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
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    required
                    helperText={touched.email && errors.email}
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.email}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    required
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    required
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.role && errors.role)}
                    fullWidth
                    required
                    helperText={touched.role && errors.role}
                    label="Role"
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.role}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
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
                    size="small"
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
                    label="motherName"
                    name="userDetails.motherName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.userDetails.motherName}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      getIn(touched, "userDetails.PhoneNumber") &&
                        getIn(errors, "userDetails.PhoneNumber")
                    )}
                    fullWidth
                    required
                    helperText={
                      getIn(touched, "userDetails.PhoneNumber") &&
                      getIn(errors, "userDetails.PhoneNumber")
                    }
                    label="PhoneNumber"
                    name="userDetails.PhoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.userDetails.PhoneNumber}
                    variant="outlined"
                    size="small"
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
                    size="small"
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
    </Card>
  );
};

// SignUpForm.propTypes = {
//   className: PropTypes.string,
// };

export default Users;
