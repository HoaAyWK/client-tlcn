import React, { useState } from 'react';
import { Dialog, Grid, Box, Stack, Typography, Link, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled, alpha } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';

import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
import { Logo, Iconify } from '../../components';

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    color: '#fff'
}));

const companyTypes = [{ id: 1, name: 'Product' }, { id: 2, name: 'Outsourcing' }];

const EmployerRegisterForm = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { open, handleClose } = props;

    const FreelancerRegisterSchema = Yup.object().shape({
        email: Yup.string().required('Email is required')
            .email('Email must be a valid email address'),
        password: Yup.string().required('Password is reuquired'),
        companyName: Yup.string().required('Company Name is reuquired'),
        companySize: Yup.string().required('Company Size is reuquired'),
        companyType: Yup.string().required('Company Type is reuquired'),
        confirmPassword: Yup.string()
            .required('Confirm Password is reuquired')
            .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
    });

    const defaultValues = {
        email: '',
        password: '',
        companyName: '',
        companySize: '',
        companyType: '',
        confirmPassword: ''
    };

    const methods = useForm({
        resolver: yupResolver(FreelancerRegisterSchema),
        defaultValues
    });

    const {
        handleSubmit
    } = methods;

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <Box sx={{ width: '100%', padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBlockEnd: 3 }}>
                    <Logo sx={{ width: 120, height: 120 }} display='flex' disabledLink />
                    <Typography variant='h4' sx={{ fontWeight: 600 }}>Register as Employer</Typography>
                </Box>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <RHFTextField name='email' type='email' label='Email *' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFTextField name='companyName' label='Company Name *' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFTextField name='companySize' label='Company Size *' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFSelect name='companyType' label='Company Type *' id='company-type' data={companyTypes} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                                <LoadingButtonStyle color='success' type='submit' variant='contained' sx={{ marginInlineEnd: 1 }}>Register</LoadingButtonStyle>
                                <Button color='error' onClick={handleClose} variant='contained'>Cancel</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </FormProvider>
            </Box>
        </Dialog>
    );
};

export default EmployerRegisterForm;