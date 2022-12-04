import React, { useState } from 'react';
import { Dialog, Grid, Box, Stack, Typography, Link, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled, alpha } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';


import { Logo, Iconify } from '../../components';

import { FormProvider, RHFTextField } from '../../components/hook-form';

const LeftAreaStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    paddingInline: 2,
    paddingBlockStart: 8,
    paddingBlockEnd: 2,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: alpha('#2b3940', 0.9),
}));

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    color: '#fff'
}));

const LoginForm = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { open, handleClose } = props;

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required')
            .email('Email must be a valid email address'),
        password: Yup.string().required('Password is reuquired')
    });

    const defaultValues = {
        email: '',
        password: '',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues
    });

    const {
        handleSubmit
    } = methods;

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
            <Box>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <LeftAreaStyle>
                                <Stack spacing={2}>
                                    <Typography sx={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', color: 'white' }}>
                                        Welcome Back
                                    </Typography>
                                    <Typography text='color.secondary' varinat='body1' sx={{ textAlign: 'center', color: 'white' }}>
                                        Login to continue your account and explore new jobs.
                                    </Typography>
                                </Stack>
                                <Box
                                    sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                                >
                                    <Typography variant='body2' color='text.secondary'>New Jobs Posted Today</Typography>
                                    <Typography variant='body2' color='text.secondary'>New Comapnies Logined</Typography>
                                </Box>
                            </LeftAreaStyle>
                        </Grid>
                        <Grid item container xs={12} md={7}>
                            <Box sx={{ width: '100%', padding: 2 }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Logo sx={{ width: 300, height: 300 }} display='flex' />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={2}>
                                            <RHFTextField name='email' label='Email *' />
                                            <RHFTextField name='password' label='Password *'
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            /> 
                                            <Link component={RouterLink} to='/forgot-password' style={{ textDecoration: 'none' }}>Forgot password?</Link>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <LoadingButtonStyle
                                                    type='submit'
                                                    color='success'
                                                    variant='contained'
                                                    sx={{ width: '100%' }}
                                                >
                                                    Login
                                                </LoadingButtonStyle>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button
                                                    color='error'
                                                    variant='contained'
                                                    sx={{ width: '100%' }}
                                                    onClick={handleClose}
                                                >
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid> 
                </FormProvider>
            </Box>
        </Dialog>
    );
};

export default LoginForm;