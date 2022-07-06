import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { signinInitiate, signinFail } from "../../redux/Action";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// import Loader from "../components/Constants/Loader";
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
    marginTop: "20px",
    backgroundColor: "green",
    color: "#fff",
  },
  logo: {
    backgroundColor: "#000",
  },
}));
const UserLogin = () => {
  const classes = usestyles();
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.reducer);
  console.log(loading);
  const dispatch = useDispatch();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    onSubmit: (values) => {
      dispatch(signinInitiate(values.email, values.password));
    },
  });

  //   if(loading){
  //     return <Loader/>
  //   }
  return (
    <>
      <Box className={classes.login}>
        <Box className={classes.login__container}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5" className={classes.logo}>
              Login{" "}
            </Typography>
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
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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

export default UserLogin;
