import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { MenuPopover, LetterAvatar } from '../../components';
import { getCurrentUser, logout } from '../../features/auth/authSlice';
import { ROLES } from '../../constants';
import TurnOnDialog from './TurnOnDialog';
import { useSnackbar } from 'notistack';
import { turnOff, turnOn } from '../../features/freelancers/freelancerSlice';
import { unwrapResult } from '@reduxjs/toolkit';

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
    const [openTurnOn, setOpenTurnOn] = useState(false);
    const [openTurnOff, setOpenTurnOff] = useState(false);
    const { employer, freelancer } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

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

    const handleTurnOnFindJob = () => {
        setOpenTurnOn(true);
    };

    const handleTurnOffFindJob = () => {
        setOpenTurnOff(true);
    };

    const handleConfirmTurnOn = async () => {
        try {
            const actionResult = await dispatch(turnOn());
            const result = unwrapResult(actionResult);

            if (result) {
                enqueueSnackbar('Turned on find job', { variant: 'success' });
                dispatch(getCurrentUser());
                handleCloseTurnOn();
                handleClose();
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }  
    };

    const handleConfirmTurnOff = async () => {
        try {
            const actionResult = await dispatch(turnOff());
            const result = unwrapResult(actionResult);

            if (result) {
                enqueueSnackbar('Turned off find job', { variant: 'success' });
                dispatch(getCurrentUser());
                handleCloseTurnOff();
                handleClose();
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    const handleCloseTurnOn = async () => {
        setOpenTurnOn(false);
    };

    const handleCloseTurnOff = () => {
        setOpenTurnOff(false);
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
                {freelancer && (
                    freelancer?.status ? (
                        <MenuItem onClick={handleTurnOffFindJob}>
                            Turn off find job
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={handleTurnOnFindJob}>
                            Turn on find job
                        </MenuItem>
                    )
                )}
                {freelancer && (
                    <MenuItem onClick={() => {
                        navigate('/my-applies');
                        handleClose();
                    }}>
                        My applies
                    </MenuItem>
                )}
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
            <TurnOnDialog
                open={openTurnOn}
                handleConfirm={handleConfirmTurnOn}
                handleClose={handleCloseTurnOn}
                title='Cofirm Turn On'
                iconColor='#00B074'
            />
            <TurnOnDialog
                open={openTurnOff}
                handleConfirm={handleConfirmTurnOff}
                handleClose={handleCloseTurnOff}
                title='Confirm Turn Off'
                iconColor='#FF4842'
            />
        </>
    );
};

export default AccountPopover;