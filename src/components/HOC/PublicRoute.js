import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import { setUser } from "../../redux/Action";
import Create_Drawer from "../Create_Drawer";

const PublicRoute = () => {
  const dispatch = useDispatch();

  const { currentAdmin } = useSelector((state) => state.admin);
  //   console.log(currentAdmin, "currentAdmin");
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  return currentAdmin ? <Navigate to="/" replace={true} /> : <Outlet />;
};

export default PublicRoute;
