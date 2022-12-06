import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Button,
    Box,
    Toolbar,
    Stack,
    Slide,
    useScrollTrigger,
    ListItemButton,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


import { Logo } from '../../components';
import AccountPopover from './AvatarPopover';
import NotificationPopover from './NotificationPopover';
import Message from './Message';
import { LoginForm, SelectDialog } from '../../features/auth';
import { useLocalStorage } from '../../hooks';
import { ACTION_STATUS, ROLES } from '../../constants';
import { getCurrentUser } from '../../features/auth/authSlice';

const APPBAR_MOBILE = 40;
const APPBAR_DESKTOP = 62;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor: alpha(theme.palette.background.default, 0.5),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 0.4,
    paddingBlock: 8,
    fontSize: '1rem',
}));

const ButtonContainedStyle = styled(Button)(({ theme }) => ({
    color: '#fff',
    borderRadius: theme.shape.borderRadius * 0.4,
    paddingBlock: 8,
    fontSize: '1rem',
}));

const StackStyle = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
    }
}));

const ListItemStyle = styled((props) => <ListItemButton {...props} />)(({ theme }) => ({
    heigth: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: theme.palette.success.main,
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: alpha(theme.palette.success.main, 0.1)
    }
}));

const ListItemPostJobStyle = styled((props) => <ListItemButton {...props} />)(({ theme }) => ({
    heigth: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: '#fff',
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius * 0.4,
    backgroundColor: theme.palette.success.main,
    '&:hover': {
        backgroundColor: theme.palette.success.dark
    }
}));


const pages = [{ name: 'Jobs', path: '/jobs' }, { name: 'About Us', path: '/#' }];

const HideOnScroll = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Header = (props) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSelectRegister, setOpenSelectRegister] = useState(false);
    const [accessToken] = useLocalStorage('accessToken', null);
    const { user, getCurrentUserStatus } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (getCurrentUserStatus === ACTION_STATUS.IDLE && accessToken) {
            dispatch(getCurrentUser());
        }
    }, [accessToken, getCurrentUserStatus]);

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleClickOpenSelectRegister = () => {
        setOpenSelectRegister(true);
    };

    const handleCloseSelectRegister = () => {
        setOpenSelectRegister(false);
    };

    return (
        <>
            <HideOnScroll {...props}>
                <RootStyle>
                    <ToolbarStyle>
                        <Box sx={{ px: 1, py: 1, display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Logo sx={{ width: '70px', height: '70px' }} display='inline-flex'/>
                        </Box>
                        <StackStyle direction='row' spacing={1}>
                            {pages.map((page) => (
                                <ListItemStyle key={page.name} component={RouterLink} to={page.path} >
                                    {page.name}
                                </ListItemStyle>

                            ))}
                            {user?.role === ROLES.EMPLOYER && (
                                <ListItemPostJobStyle component={RouterLink} to='/create-job' variant='contained' color='success'>
                                    POST JOB
                                </ListItemPostJobStyle>
                            )}
                        </StackStyle>
                        {/* <Searchbar /> */}
                        <Box sx={{ flexGrow: 1 }} />
                
                        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                            {user ? (
                                <>
                                    <Message />
                                    <NotificationPopover />
                                    <AccountPopover user={user} />
                                </>
                            )
                                : 
                            (
                                <>
                                    <ButtonStyle color='success' onClick={handleClickOpenLogin}>Login</ButtonStyle>
                                    <ButtonContainedStyle color='success' variant='contained' onClick={handleClickOpenSelectRegister}>Register</ButtonContainedStyle>
                                </>
                            )}
                        </Stack>
                    </ToolbarStyle>
                </RootStyle>
            </HideOnScroll>
            <LoginForm open={openLogin} handleClose={handleCloseLogin} />
            <SelectDialog
                open={openSelectRegister}
                handleClose={handleCloseSelectRegister}
            />
            <Box sx={{ marginBlockEnd: 11 }} />
        </>
    );
};

export default Header;
