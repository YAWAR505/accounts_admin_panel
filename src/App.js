import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { LoginRoute, UseRoute } from "./components/Routes/Routes";
import { auth } from "./firebase";

import { signinSuccess, logoutInitiate } from "./redux/Action";

import Loader from "./components/Constants/Loader";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.reducer);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signinSuccess(user));
      } else {
        // User is signed out.
        dispatch(logoutInitiate(user));
      }
    });
    return unsubscribe();
  }, []);

  let element = useRoutes(UseRoute());

  if (isAuth.loading) {
    return <Loader />
  }

  return (
    <>
      {element}
      <ToastContainer />
    </>

  );
};
export default App;
