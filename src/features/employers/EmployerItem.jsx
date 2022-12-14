import React from 'react';
import { styled, alpha } from '@mui/material';
import {
    Box,
    Container,
    Stack,
    Button,
    Typography,
    Avatar,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Iconify, Label } from '../../components';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    border: `0.5px solid ${theme.palette.grey[500_24]}`,
    transition: 'all .5s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        border: `0.5px solid ${theme.palette.success.dark}`,
    }
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff'
}));

const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 10,
    paddingBlock: 5,
    width: '100%',
    minHeight: 100,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    [theme.breakpoints.up('xs')]: {
        width: 60,
        height: 60
    },
    [theme.breakpoints.up('md')]: {
        width: 80,
        height: 80
    }
}));

const EmployerItem = ({ employer, skills }) => {
    const navigate = useNavigate();

    const id = employer?.id || employer?._id;
    return (
        <Wrapper>
            <BoxStyle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RouterLink to={`/employer/${id}`}>
                        <AvatarStyle src={employer?.user?.image} alt={employer?.companyName} />
                    </RouterLink>
                    <Stack spacing={0.5} sx={{ marginInlineStart: 2 }}>
                        <Stack direction='row' spacing={1}>
                            <Typography
                                component={RouterLink}
                                to={`/employer/${id}`}
                                variant='body1'
                                color='text.primary'
                                sx={{ fontWeight: 600, textDecoration: 'none' }}
                            >
                                {employer?.companyName}
                            </Typography>
                            <Label
                                variant='ghost'
                                color={
                                    employer?.user?.stars >= 0
                                    && employer?.user?.stars < 2 && 'error' ||
                                    employer?.user?.stars >= 2 && employer?.user?.stars < 3.5 && 'warning' ||
                                    'success' 
                                }
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Iconify icon='ic:twotone-star-outline' width={16} height={16} />
                                    <Typography variant='body2' sx={{ marginInlineStart: 0.5 }}>
                                        {employer?.user?.stars}
                                    </Typography>
                                </Box>
                            </Label>
                        </Stack>
                        <Typography variant='body2' color='text.secondary'>
                            {employer?.user?.email}
                        </Typography>
                    </Stack>
                </Box>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack direction='row' spacing={1}>
                            {skills?.map((skill) => (
                                <Label variant='ghost' color='primary'>
                                    {skill?.name}
                                </Label>
                            ))}
                        </Stack>
                    </Box>
                </Stack>
                <Stack direction='row' spacing={1}>
                    <ButtonStyle
                        color='primary'
                        variant='contained'
                        onClick={() => {
                            navigate(`/employer/${employer?._id}`)
                        }}
                    >
                        Details
                    </ButtonStyle>
                </Stack>
            </BoxStyle>
        </Wrapper>
    );
}

export default EmployerItem;