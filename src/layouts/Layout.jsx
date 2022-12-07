import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Header from './header/Header';
import Footer from './Footer';

const RootStyle = styled('div')({
    minHeight: '100%',
    overflow: 'hidden'
});

export default function Layout() {
    return (
        <RootStyle>
            <Header />
            <Outlet />
            <Footer />
        </RootStyle>
    );
}