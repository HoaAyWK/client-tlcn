import React, { useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

import { Iconify, Page } from '../components';
import { runFireworks  } from '../utils/runFireworks'

const BoxStyle = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.grey[500_24], 0.2),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: 5,
    paddingBlock: 10,
    minWidth: 400
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff',
    marginBlockStart: 1,
    marginBlockEnd: 2
}));

const SuccessPayment = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');

    useEffect(() => {
        if (success) {
            runFireworks();
        }
    }, [success]);

    return (
        <Page title='Payment Success'>
            <Container maxWidth='lg'>
                <Box
                    sx={{
                        minHeight: '80vh',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <BoxStyle>
                        <Iconify icon='icon-park-solid:success' color='#00B074' width={100} height={100} />
                        <Typography variant='h4' color='text.secondary' sx={{ marginBlock: 2 }}>
                            Payment Successfully
                        </Typography>
                        <Typography variant='body1' color='text.secondary' sx={{ marginBlockEnd: 2 }}>
                            Go to profile to see you payment history
                        </Typography>
                        <ButtonStyle color='success' variant='contained'>GO TO HOME</ButtonStyle>
                    </BoxStyle>
                </Box>
            </Container>
        </Page>
    )
}

export default SuccessPayment