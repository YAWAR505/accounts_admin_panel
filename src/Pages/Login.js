import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import UserLogin from "./Loginpage/UserLogin";
import school from "../images/school.jpg";
import school2 from "../images/school2.jpg";

const usestyles = makeStyles(() => ({
  loginpage: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#b7b3c6f2",
    minHeight: "100vh",
  },
  schoolimg: {
    width: "100%",
    display: "flex",
    justifyContent: "center",

    objectFit: "contain",
  },
  school: {
    backgroundColor: "#000",
    width: "100%",
  },
}));
const Login = () => {
  const classes = usestyles();

  return (
    <>
      <Grid container spacing={1} className={classes.loginpage}>
        <Grid item md={6} xs={12}>
          <UserLogin />
        </Grid>
        <Grid item md={6} xs={12}>
          <img src={school2} alt="school" className={classes.schoolimg} />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
