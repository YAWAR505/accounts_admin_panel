import { Button } from '@material-ui/core'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutInitiate } from "../../redux/Action";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { paths } from '../Routes/paths';
import { useNavigate } from 'react-router-dom';
const LogOut = ({ classes }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signoutHanlder = () => {
        swal({
            title: "Would you Want to log out?",
            text: "Once you log out , you will  be perminantly logged out !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(logoutInitiate());
                navigate(paths.getLogin());
                swal(" Log Out successfully !", {
                    icon: "success",
                });
            } else {
                swal("You are not logged Out!");
            }
        });
    };
    return (
        <Button
            startIcon={<LogoutIcon />}
            variant="contained"
            className={classes.logoutBtn}
            onClick={signoutHanlder}
        >
            Logout
        </Button>
    )
}

export default LogOut
