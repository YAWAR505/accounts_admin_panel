import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { paths } from "../Routes/paths";
const Manu = [
  {
    path: paths.getDashboard(),
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: paths.getUsers(),
    title: "Users",
    icon: <GroupIcon />,
    
  },
  {
    path: paths.getCourses(),
    title: "Classes",
    icon: <LibraryBooksIcon />,
  },
  {
    path: paths.getStudents(),
    title: "Students",
    icon: <SchoolIcon />,
  },
  {
    path: paths.getPayFee(),
    title: "Pay Fee",
    icon: <AccountBalanceIcon />,
  },
  {
    path: paths.getTransactions(),
    title: "Transactions",
    icon: <ManageAccountsIcon />,
  },
];
export default Manu;
