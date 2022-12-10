import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading, Page } from '../components';
import { confirmEmail, resetConfirmEmailStatus } from '../features/auth/authSlice';

const ConfrimEmail = () => {
    const { token } = useParams();
    const dispatch = useDispatch(confirmEmail(token));
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function confirm() {
            try {
                const actionResult = await dispatch(confirmEmail(token));
                const result = unwrapResult(actionResult);

                if (result) {
                    dispatch(resetConfirmEmailStatus());
                    enqueueSnackbar('Confirmed email successfully', { variant: 'success' });
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
        <Page title='Confirm Email'>
            <Loading />
        </Page>
    );
};

export default ConfrimEmail;