import Courses from "../../Pages/Courses";
import Student from "../../Pages/Student";
import Register from "../../Pages/Register";
import AddCourses from "../../Pages/AddCourses";
import Charts from "../Dashboard/Charts";
import PayFee from "../Dashboard/PayFee";
import RegisterUsers from "../Dashboard/RegisterUsers";
import UsersList from "../Dashboard/UsersList";
import Transactions from "../Dashboard/Transactions";
import Create_Drawer from "../Create_Drawer";
import Login from "../../Pages/Login";
import { paths } from "./paths";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export const UseRoute = () => [
  {
    path: paths.getRoot(),
    element: auth.currentUser ? (
      <Create_Drawer />
    ) : (
      <Navigate to={paths.getLogin()}/>
    ),
    children: [
      { path: paths.getDashboard(), element: <Charts /> },
      { path: paths.getCourses(), element: <Courses /> },
      { path: paths.getCourseAdd(), element: <AddCourses /> },
      { path: paths.getCourseEdit(":id"), element: <AddCourses /> },
      { path: paths.getStudents(), element: <Student /> },
      { path: paths.getRegisterStudents(), element: <Register /> },
      { path: paths.getRegisterStudentsEdit(":id"), element: <Register /> },
      { path: paths.getPayFee(), element: <PayFee /> },
      { path: paths.getRegisterUsers(), element: <RegisterUsers /> },
      { path: paths.getUsersEdit(":id"), element: <RegisterUsers />},
      { path: paths.getUsersList(), element: <UsersList /> },
      { path: paths.getTransactions(), element: <Transactions /> },
    ],
  },
  {
    path: paths.getLogin(),
    element: !auth.currentUser  ? <Login /> : <Navigate to={paths.getDashboard()}/>,
  },
];
