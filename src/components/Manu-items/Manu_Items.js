import { paths } from "../Routes/Routes";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
const Manu = [
  {
    path: paths.DASHBOARD,
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: paths.USER_LIST,
    title: "users",
    icon: <GroupIcon />,
  },
  {
    path: paths.COURSES,
    title: "Classes",
    icon: <LibraryBooksIcon />,
  },
  {
    path: paths.STUDENTS,
    title: "Students",
    icon: <SchoolIcon />,
  },
  {
    path: paths.TRANCTIONS,
    title: "Transctions",
    icon: <ManageAccountsIcon />,
  },
];
export default Manu;
