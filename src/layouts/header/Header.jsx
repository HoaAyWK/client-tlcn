import React, { useState} from 'react';
import {
    AppBar,
    Button,
    Box,
    Toolbar,
    Stack,
    Slide,
    useScrollTrigger
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { Logo } from '../../components';
import AccountPopover from './AvatarPopover';
import NotificationPopover from './NotificationPopover';
import Message from './Message';

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

const ButtonRegisterStyle = styled(Button)(({ theme }) => ({
    color: '#fff',
    borderRadius: theme.shape.borderRadius * 0.4,
    paddingBlock: 8,
    fontSize: '1rem',
}));


const pages = ['Home', 'About Us', 'Jobs'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
    const [user, setUser] = useState(null)

    return (
        <>
            <HideOnScroll {...props}>
                <RootStyle>
                    <ToolbarStyle>
                        <Box sx={{ px: 1, py: 1, display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Logo sx={{ width: '70px', height: '70px' }} display='inline-flex'/>
                        </Box>
                        <Stack direction='row' spacing={1}>
                            {pages.map((page) => (<ButtonStyle color='success' key={page}>{page}</ButtonStyle>))}
                        </Stack>
                        {/* <Searchbar /> */}
                        <Box sx={{ flexGrow: 1 }} />
                
                        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                            {!user ? (
                                <>
                                    <Message />
                                    <NotificationPopover />
                                    <AccountPopover user={user} />
                                </>
                            )
                                : 
                            (
                                <>
                                    {/* <ButtonStyle color='success'>Login</ButtonStyle>
                                    <ButtonRegisterStyle color='success' variant='contained'>Register</ButtonRegisterStyle> */}
                                </>
                            )}
                        </Stack>
                    </ToolbarStyle>
                </RootStyle>
            </HideOnScroll>
            <Box sx={{ marginBlockEnd: 15 }} />
        </>
    );
};

export default Header;
