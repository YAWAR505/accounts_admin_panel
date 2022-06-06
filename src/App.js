import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  Outlet,
  BrowserRouter as Router,
} from "react-router-dom";
import Create_Drawer from "./components/Create_Drawer";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import PublicRoute from "./components/HOC/PublicRoute";
import { RoutesItems } from "./components/Routes/Routes";
import { auth } from "./firebase";
import Login from "./Pages/Login";
import { setUser } from "./redux/Action";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<ProtectedRoute />}> */}
          <Route path="/" element={<Create_Drawer />}>
            {RoutesItems.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
