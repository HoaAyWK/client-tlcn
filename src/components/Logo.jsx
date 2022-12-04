import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

import { ReactComponent as AppLogo } from '../assets/logo.svg';

const Logo = ({ disabledLink = false, sx, display }) => {
    const logo = (
        <Box sx={{ width: 60, height: 60, ...sx, display, alignItems: 'center' }}>
            <AppLogo />
        </Box>
    );

    if (disabledLink) {
        return <>{logo}</>
    }

    return (
        <RouterLink to='/'>{logo}</RouterLink>
    );
};

Logo.propTypes = {
    disabledLink: PropTypes.bool,
    sx: PropTypes.object
};

export default Logo;
