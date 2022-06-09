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
import { paths } from "./paths";

export const UseRoute = [
  {
    path: paths.getRoot(),
    element: <Create_Drawer />,
    children: [
      { path: paths.getDashboard(), element: <Charts /> },
      { path: paths.getCourses(), element: <Courses /> },
      { path: paths.getCourseAdd(), element: <AddCourses /> },
      { path: paths.getCourseEdit(":id"), element: <AddCourses /> },
      { path: paths.getStudents(), element: <Student /> },
      { path: paths.getRegisterStudents(), element: <Register /> },
      { path: paths.getPayFee(), element: <PayFee /> },
      { path: paths.getUsers(), element: <Users /> },
      // { path: paths.getUsersList(), element: <UsersList /> },
      { path: paths.getTransactions(), element: <Transactions /> },
    ],
  },
];

// export const RoutesItems = [
//   {
//     path: paths.COURSES,
//     component: Courses,
//   },
//   {
//     path: paths.STUDENTS,
//     component: Student,
//   },
//   {
//     path: paths.ADD_USER,
//     component: Signup,
//   },
//   {
//     path: paths.ADD_COURSE,
//     component: AddCourses,
//   },
//   {
//     path: paths.EDIT_COURSE,
//     component: AddCourses,
//   },
//   {
//     path: paths.DASHBOARD,
//     component: Charts,
//   },
//   {
//     path: paths.PAY_FEE,
//     component: PayFee,
//   },
//   {
//     path: paths.USERS,
//     component: Users,
//   },
//   {
//     path: paths.USER_LIST,
//     component: UsersList,
//   },
//   {
//     path: paths.TRANSACTIONS,
//     component: Transactions,
//   },
// ];
