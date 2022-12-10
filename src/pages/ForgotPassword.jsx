import React, { useState } from 'react';
import { Container, Grid, Box, Stack, Typography, Link, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled, alpha } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { Iconify, Page } from '../components';
import { FormProvider, RHFTextField } from '../components/hook-form';
import { forgotPassword } from '../features/auth/authSlice';
import { ACTION_STATUS } from '../constants';

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    color: '#fff'
}));

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address'),
        password: Yup.string()
            .required('Password is reuquired')
            .test('len', 'New Password must be at least 6 characters', val => val.length > 5),
        confirmPassword: Yup.string()
            .required('Confirm Password is reuquired')
            .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
    });

    const defaultValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const methods = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues
    });

    const {
        handleSubmit,
        reset,
    } = methods;

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const actionResult = await dispatch(forgotPassword(data));
            const result = unwrapResult(actionResult);
            
            if (result.success) {
                enqueueSnackbar(`We just sent an email to ${data.email}`, { variant: 'success' });
                reset();
            }

        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };
    return (
        <Page title='Forgot password'>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Container maxWidth='sm'>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h5' color='text.secondary' textAlign='center' sx={{ marginBlockEnd: 2 }}>
                                    Forgot Password
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={2}>
                                    <RHFTextField name='email' label='Email *' />
                                    <RHFTextField name='password' label='New Password *'
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
                                    <RHFTextField name='confirmPassword' label='Confirm Password *'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                    /> 
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButtonStyle
                                    type='submit'
                                    color='success'
                                    variant='contained'
                                    sx={{ width: '100%', marginBlockStart: 2 }}                       
                                >
                                    CONFIRM
                                </LoadingButtonStyle>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' color='primary' sx={{ width: '100%', marginBlockStart: 2 }} >
                                    BACK TO HOME
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </FormProvider>
            </Box>
        </Page>
    )
}

export default ForgotPassword;