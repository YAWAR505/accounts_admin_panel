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
import { UseRoute } from "./components/Routes/Routes";
import { auth } from "./firebase";
import Login from "./Pages/Login";
import { setUser } from "./redux/Action";
const App = () => {
  let element = useRoutes(UseRoute);
  return element;
};
export default App;

{
  /* <Routes>
          <Route path="/" element={<Create_Drawer />}>
            {RoutesItems.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes> */
}
