import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutInitiate } from "../../redux/Action";
import swal from "sweetalert";
import { paths } from '../Routes/paths';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { makeStyles } from '@material-ui/core';
import school from "../../images/school.jpg";
import student from "../../images/student.jpeg";


const useStyles = makeStyles(() => ({
    profile: {
        textTransform: "capitalize"
    }
}))
const AccountMenu = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentAdmin } = useSelector((state) => state.reducer)
    const result = user.filter((item) => item.email === currentAdmin.email)

    useEffect(() => {
        const q = query(collection(db, "Users"), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasks = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUser(tasks);
        });
        return () => unsubscribe();
    }, []);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
        <>


            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}>
                    {/* <AccountCircleIcon sx={{ fontSize: 40 }} color="primary" /> */}
                    <Avatar src={student} />
                </IconButton>
            </Tooltip>
            {
                result.map((item) => (

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem className={classes.profile}>
                            <Avatar src={school} alt={item.firstName} /> {item.firstName} {item.lastName}
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <Avatar /> My account
                        </MenuItem>

                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem
                            onClick={signoutHanlder}

                        >
                            <ListItemIcon

                            >
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>

                ))
            }

        </>
    );
}
export default AccountMenu