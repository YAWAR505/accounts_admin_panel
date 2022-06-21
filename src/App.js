import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { LoginRoute, UseRoute } from "./components/Routes/Routes";
import { auth } from "./firebase";

import { signinSuccess, logoutInitiate } from "./redux/Action";
const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.reducer);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signinSuccess(user));
      } else {
        // User is signed out.
        dispatch(logoutInitiate(null));
      }
    });
    return unsubscribe();
  }, []);
  const { currentAdmin } = isAuth;
  console.log(currentAdmin, "currentAdmin");
  let element = useRoutes(UseRoute(currentAdmin));
  return element;
};
export default App;
