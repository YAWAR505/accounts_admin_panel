import Courses from "../../Pages/Courses";
import student from "../../Pages/Student";
import Signup from "../../Pages/Signup";
import AddCourses from "../../Pages/AddCourses";
import Charts from "../Dashboard/Charts";
import Transactions from "../Dashboard/Transactions";
import Users from "../Dashboard/Users";
import UsersList from "../Dashboard/UsersList";
export const paths = {
  USERS: "user",
  COURSES: "courses",
  STUDENTS: "students",
  ADD_USER: "add_user",
  ADD_COURSE: "add_course",
  DASHBOARD: "dashboard",
  TRANCTIONS: "tranctions",
  USER_LIST: "user_list",
};

export const RoutesItems = [
  {
    path: paths.COURSES,
    component: Courses,
  },
  {
    path: paths.STUDENTS,
    component: student,
  },
  {
    path: paths.ADD_USER,
    component: Signup,
  },
  {
    path: paths.ADD_COURSE,
    component: AddCourses,
  },
  {
    path: paths.DASHBOARD,
    component: Charts,
  },
  {
    path: paths.TRANCTIONS,
    component: Transactions,
  },
  {
    path: paths.USERS,
    component: Users,
  },
  {
    path: paths.USER_LIST,
    component: UsersList,
  },
];
