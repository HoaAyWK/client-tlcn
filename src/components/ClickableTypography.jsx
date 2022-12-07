import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const TypographyStyle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main
}));

const ClickableTypography = ({ handleClick, children }) => {
    return (
        <TypographyStyle
            variant='body2'
            sx={{
                fontWeight: 600,
                cursor: 'pointer',
                color: 'info'
            }}
            onClick={handleClick}
        >
            {children}
        </TypographyStyle>
    );
};

export default ClickableTypography;