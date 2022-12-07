import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Avatar, Button, Typography, Stack  } from '@mui/material';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { Iconify } from '../../components';
import { useSnackbar } from 'notistack';
import { checkout, refresh } from '../checkout/checkoutSlice';


const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBlockStart: 5,
    borderRadius: theme.shape.borderRadius,
    transition: 'all .5s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
    }
}));

const BgStyled = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.success.main, 0.1),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBlockStart: 50,
    borderRadius: theme.shape.borderRadius,
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff'
}));

const BoxAvatarStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    marginInline: 'auto',
    width: 100,
    [theme.breakpoints.up('xs')]: {
        width: 60,
        height: 60
    },
    [theme.breakpoints.up('md')]: {
        width: 80,
        height: 80
    }
}));

const BoxBufferStyle = styled(Box)(({ theme }) => ({

    [theme.breakpoints.up('xs')]: {
       
        height: 30
    },
    [theme.breakpoints.up('md')]: {
      
        height: 40
    }
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.success.main, 0.1),
    boxShadow: theme.shadows[2],
    border: `4px solid ${theme.palette.common.white}`,
    zIndex: 10,
    boxShadow: theme.shadows[0],
    [theme.breakpoints.up('xs')]: {
        width: 60,
        height: 60
    },
    [theme.breakpoints.up('md')]: {
        width: 80,
        height: 80
    }
}));

const PricingItem = ({ item }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleclickPurchase = async (e) => {
        const pricingId = e.target.value;
        
        try {
            const actionResult = await dispatch(checkout(pricingId));
            const result = unwrapResult(actionResult);

            if (result) {
                dispatch(refresh());
                window.location.href = result.url;
            }

        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <Wrapper>
            <Box
                sx={{
                    width: '100%',
                    position: 'relative',
                }}
            >
                <BoxAvatarStyle>
                    <AvatarStyle>
                        <Iconify icon='mdi:package-outline' style={{ color: '#00B074' }} width={40} height={40} />
                    </AvatarStyle>
                </BoxAvatarStyle>
                <BoxBufferStyle />
                <BgStyled>
                    <Typography
                        variant='h3'
                        color='text.secondary'

                    >
                        {`$${item?.price}`}
                    </Typography>
                    <Typography
                        variant='body1'
                        color='text.secondary'
                    >
                        {item?.description}
                    </Typography>
                    <Stack direction='row' spacing={1} sx={{ marginBlock: 1 }}>
                        <Iconify icon='mdi:tick-circle' style={{ color: '#00B074' }} width={24} height={24} />
                        <Typography variant='body1' color='text.secondary'>
                            {`${item?.canPost} times post job`}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} sx={{ marginBlock: 1 }}>
                        <Iconify icon='mdi:tick-circle' style={{ color: '#00B074' }} width={24} height={24} />
                        <Typography variant='body1' color='text.secondary'>
                            {`${item?.point} Points`}
                        </Typography>
                    </Stack>
                    <ButtonStyle
                        variant='contained'
                        color='success'
                        sx={{ marginBlockEnd: 2 }}
                        value={item?.id}
                        onClick={handleclickPurchase}
                    >
                        Purchase Now
                    </ButtonStyle>
                </BgStyled>
            </Box>
        </Wrapper>
    )
}

export default PricingItem;