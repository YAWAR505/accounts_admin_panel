import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import { setUser } from "../../redux/Action";
import Create_Drawer from "../Create_Drawer";

// const ProtectedRoute = ({ children }) => {
//   // const dispatch = useDispatch();
//   // const { currentAdmin, loading } = useSelector((state) => state.admin);
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }
//   // const [user, setUser] = useState(null);
//   const [userAuth, setUserAuth] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setUserAuth(user);
//     });
//   }, [userAuth]);

//   return userAuth ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
