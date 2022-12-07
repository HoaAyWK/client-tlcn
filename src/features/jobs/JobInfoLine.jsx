import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';

import Iconify from '../../components/Iconify';

const JobInfoStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between'
}));

const BoxStyle = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        minWidth: 400
    },
    [theme.breakpoints.up('md')]: {
        minWidth: 150
    }
}));

const JobInfoLine = (props) => {
    const { icon, iconStyle, title, content } = props;
    return (
        <JobInfoStyle>
            <Stack direction='row' spacing={1}>
                <Iconify icon={icon} width={25} height={25} style={iconStyle} />
                <Typography variant='body1' color='text.secondary'>
                    {title}
                </Typography>
            </Stack>
            <BoxStyle
                sx={{ minWidth: 150 }}
            >          
                <Typography variant='body1'>
                    {content}
                </Typography>
            </BoxStyle>
        </JobInfoStyle>
    );
};

export default JobInfoLine;