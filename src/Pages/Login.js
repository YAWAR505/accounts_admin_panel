import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import UserLogin from "./Loginpage/UserLogin";
const usestyles = makeStyles(() => ({
  loginpage:{
    width: '100%',
    display: 'flex',
  }
 }))
const Login = () => {
  const classes = usestyles();

  return (
    <>
      <Grid  container spacing={2} className={classes.loginpage}>
      <Grid item xs={12}>
      </Grid>
      <UserLogin/>
      </Grid>
    </>
  );
};

export default Login;
