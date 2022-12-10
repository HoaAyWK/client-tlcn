import React, { useState } from 'react';
import { Dialog, Grid, Box, Stack, Typography, Link, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled, alpha } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { Logo, Iconify } from '../../components';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { forgotPassword, login } from './authSlice';
import { ACTION_STATUS } from '../../constants';

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

const ForgotPasswordDialog = (props) => {
    const { open, handleClose } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loginStatus } = useSelector(state => state.auth);
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
        try {
            const actionResult = await dispatch(forgotPassword(data));
            const result = unwrapResult(actionResult);
            
            if (result.success) {
                enqueueSnackbar(`We just sent an email to ${data.email}`, { variant: 'success' });
                reset();
                handleClose();
            }

        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
            <Box>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
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
                                <RHFTextField name='confirmePassword' label='Confirm Password *'
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
                           <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}
                            >   
                                <LoadingButtonStyle
                                    type='submit'
                                    color='success'
                                    variant='contained'
                                    sx={{ width: '100%' }}
                                    loading={loginStatus === ACTION_STATUS.LOADING ? true : false}
                                >
                                    Confirm
                                </LoadingButtonStyle>
                                <Button variant='contained' color='error' onClick={handleClose} sx={{ marginInlineStart: 1 }}>
                                    Cancel
                                </Button>
                            </Box> 
                        </Grid>
                    </Grid>
                </FormProvider>
            </Box>
        </Dialog>
    );
};

export default ForgotPasswordDialog;
