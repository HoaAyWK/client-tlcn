import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Stack, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { RHFTextField, FormProvider } from '../../components/hook-form';
import { Iconify } from '../../components';
import { changePassword, logout } from '../auth/authSlice';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    backgroundColor: theme.palette.success.dark,
    '&:hover': {
        backgroundColor: theme.palette.success.main,
    },
    color: '#fff'
}));

const ChangePasswordFrom = () => {
    const { user } = useSelector(state => state.auth);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setConfirmShowNewPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const UserSchema = Yup.object().shape({
        id: Yup.string().required(),
        oldPassword: Yup.string().required('Old Password is required'),
        newPassword: Yup.string()
            .required('New Passsword is reuquired')
            .test('len', 'New Password must be at least 6 characters', val => val.length > 5),
        confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Cofirm New Password must match New Password')
    });

    const defaultValues = {
        id: user?.id,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    const methods = useForm({
        resolver: yupResolver(UserSchema),
        defaultValues
    });

    const {
        handleSubmit
    } = methods;

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const actionResult = await dispatch(changePassword(data));
            const result = unwrapResult(actionResult);

            if (result) {
                enqueueSnackbar('Changed password successfully. Please, login again!', { variant: 'success' });
                dispatch(logout());
                navigate('/');
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Stack spacing={2}>
                <RHFTextField name='oldPassword' label='Old Password *' type='password' />
                <RHFTextField name='newPassword' label='New Password *'
                    type={showNewPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                                <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
                <RHFTextField name='confirmNewPassword' label='Cofirm New Password *'
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setConfirmShowNewPassword(!showConfirmNewPassword)} edge="end">
                                <Iconify icon={showConfirmNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                    <LoadingButtonStyle
                        size="large"
                        type="submit"
                        variant="contained"

                    >
                        Save Changes
                    </LoadingButtonStyle>
                </Box>
            </Stack>
        </FormProvider>
    );
};

export default ChangePasswordFrom;