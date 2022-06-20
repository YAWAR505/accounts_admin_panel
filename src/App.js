import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  Outlet,
  useRoutes,
  BrowserRouter as Router,
} from "react-router-dom";
import { paths } from "./components/Routes/paths";
import { LoginRoute, UseRoute } from "./components/Routes/Routes";
import { auth } from "./firebase";
import Login from "./Pages/Login";
import { setUser } from "./redux/Action";

const App = () => {
  const isAuth = useSelector((state) => state.reducer);
  const { currentAdmin } = isAuth;
  console.log(currentAdmin);
  let element = useRoutes(UseRoute(currentAdmin));
  return element;
};
export default App;
