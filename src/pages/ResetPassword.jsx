import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading, Page } from '../components';
import { confirmEmail, resetPassword, resetResetPasswordStatus } from '../features/auth/authSlice';

const ConfrimEmail = () => {
    const { token } = useParams();
    const dispatch = useDispatch(confirmEmail(token));
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function confirm() {
            try {
                const actionResult = await dispatch(resetPassword(token));
                const result = unwrapResult(actionResult);

                if (result) {
                    dispatch(resetResetPasswordStatus());
                    enqueueSnackbar('Reset password successfully', { variant: 'success' });
                    navigate('/');
                }
            } catch (error) {
                enqueueSnackbar(error.message, { variant: 'error' });
                navigate('/');
            }
        }

        confirm();
    }, [token, dispatch, enqueueSnackbar, navigate]);

    return (
        <Page title='Reset Password'>
            <Loading />
        </Page>
    );
};

export default ConfrimEmail;