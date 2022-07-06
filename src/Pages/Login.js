import { Box, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
      <Grid className={classes.loginpage}>
       
      <UserLogin/>
      </Grid>
    </>
  );
};

export default Login;
