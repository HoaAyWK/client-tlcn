import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { MenuPopover, LetterAvatar } from '../../components';
import { logout } from '../../features/auth/authSlice';
import { ROLES } from '../../constants';

const FREELANCER_MENU_OPTIONS = [
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      linkTo: 'profile',
    },
];

const EMPLOYER_MENU_OPTIONS = [
    {
        label: 'Profile',
        icon: 'eva:person-fill',
        linkTo: 'profile',
      },
      {
          label: 'Manage Jobs',
          icon: 'eva:settings-2-fill',
          linkTo: 'manage-jobs',
      },
      {
          label: 'Create Job',
          icon: 'eva:settings-2-fill',
          linkTo: 'create-job',
      },
]

const AccountPopover = ({ user }) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(null);
    const [menu, setMenu] = useState([]);
    const [name, setName] = useState('');
    const { employer, freelancer } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === ROLES.FREELANCER) {
            setMenu(FREELANCER_MENU_OPTIONS);
        }

        if (user?.role === ROLES.EMPLOYER) {
            setMenu(EMPLOYER_MENU_OPTIONS);
        }
    }, [user]);

    useEffect(() => {
        if (employer) {
            setName(employer.companyName);
        }
    }, [employer]);

    useEffect(() => {
        if (freelancer) {
            setName(freelancer.firstName + " " + freelancer.lastName);
        }
    }, [freelancer])

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        setOpen(null);
        navigate('/');
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                p: 0,
                ...(open && {
                    '&:before': {
                        zIndex: 1,
                        content: "''",
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        position: 'absolute',
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                    },
                }),
                }}
            >
                {user?.image ? 
                    (<Avatar src={user?.image} alt="photoURL" />)
                    :
                    (<LetterAvatar name={name} />)}
                
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                sx={{
                p: 0,
                mt: 1.5,
                ml: 0.75,
                '& .MuiMenuItem-root': {
                    typography: 'body2',
                    borderRadius: 0.75,
                },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                   {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {user?.email}
                </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                {menu.map((option) => (
                    <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                        {option.label}
                    </MenuItem>
                ))}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </MenuPopover>
        </>
    );
};

export default AccountPopover;