import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import UserLogin from "./Loginpage/UserLogin";
import school from "../images/school.jpg";
import school2 from "../images/school2.jpg";

const usestyles = makeStyles(() => ({
  Signup_Box:{
    width: "100%",
    backgroundColor: "#13131ebf", 
    minHeight: "100vh",
    display: "flex",
    justifyContent:"space-around"
    
  },
  loginpage: {
    alignItems: "center",
    width: "75%",
    display: "flex",
  },
  // school: {
  //   backgroundColor: "#fff",
  // },
  schoolimg: {
    height: "545px",
    width: "100%",
    borderRadius: "5px",
    opacity:"0.5"
  },
 
}));
const Login = () => {
  const classes = usestyles();

  return (
    <>
    <Box className={classes.Signup_Box}>  
    <Grid container spacing={1} className={classes.loginpage}>
        <Grid item md={6} xs={12}>
          <div className={classes.school}>
            <img src={school2} alt="school" className={classes.schoolimg}/>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
        <UserLogin />
      
        </Grid>
      </Grid>

    
    </Box>
    </>
  );
};

export default Login;
