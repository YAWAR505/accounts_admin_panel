import Courses from "../../Pages/Courses";
import Student from "../../Pages/Student";
import Register from "../../Pages/Register";
import AddCourses from "../../Pages/AddCourses";
import Charts from "../Dashboard/Charts";
import PayFee from "../Dashboard/PayFee";
import Users from "../Dashboard/Users";
import UsersList from "../Dashboard/UsersList";
import Transactions from "../Dashboard/Transactions";
import Create_Drawer from "../Create_Drawer";
import Login from "../../Pages/Login";
import { paths } from "./paths";
import { Navigate, Outlet } from "react-router-dom";

export const UseRoute = (currentAdmin) => [
  {
    path: paths.getRoot(),
    element: currentAdmin ? (
      <Create_Drawer />
    ) : (
      <Navigate to={paths.getLogin()} />
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
      { path: paths.getUsers(), element: <Users /> },
      { path: paths.getUsersList(), element: <UsersList /> },
      { path: paths.getTransactions(), element: <Transactions /> },
    ],
  },
  {
    path: paths.getLogin(),
    element: !currentAdmin ? <Login /> : <Navigate to={paths.getDashboard()} />,
  },
];
