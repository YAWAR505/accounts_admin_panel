import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signinInitiate } from "../redux/Action";
const usestyles = makeStyles(() => ({
  login: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    alignContent: "flex-end",
    height: "650px",
  },
  login__container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "green",
    color: "#fff",
  },
}));
const Login = () => {
  const classes = usestyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(signinInitiate(values.email, values.password));
        navigate("/dashboard");
        toast.dark("Login Successful");
      } catch (e) {
        if (e.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (e.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Box className={classes.login}>
        <Box className={classes.login__container}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5">Login </Typography>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.button}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
