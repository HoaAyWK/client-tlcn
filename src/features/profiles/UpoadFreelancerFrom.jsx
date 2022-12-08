import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useChatContext } from 'stream-chat-react';

import { RHFTextField, RHFRadioGroup, FormProvider } from '../../components/hook-form';

import { ACTION_STATUS } from '../../constants';
import { refresh, updateFreelancer } from './profileSlice';
import { getCurrentUser } from '../auth/authSlice';

const genders = ['Male', 'Female'];


const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    backgroundColor: theme.palette.success.dark,
    '&:hover': {
        backgroundColor: theme.palette.success.main,
    },
    color: '#fff'
}));

const UpoadFreelancerFrom = () => {
    const { freelancer, user } = useSelector(state => state.auth);
    const { client } = useChatContext();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { updateFeelancerStatus } = useSelector(state => state.profile);

    useEffect(() => {
        if (updateFeelancerStatus === ACTION_STATUS.SUCCESSED) {
            dispatch(getCurrentUser());
            dispatch(refresh());
        }
    }, [updateFeelancerStatus, dispatch]);

    const FreelancerSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        gender: Yup.string().required('Gender is required'),
        experiences: Yup.string().required('Experiences is required'),
    });

    const defaultValues = {
        firstName: freelancer?.lastName,
        lastName: freelancer?.firstName,
        experiences: freelancer?.doneJobs,
        gender: freelancer?.gender ? freelancer?.gender : 'Male',
    };
    
    const methods = useForm({
        resolver: yupResolver(FreelancerSchema),
        defaultValues
    });

    const {
        handleSubmit,
        setFocus
    } = methods;


    const onSubmit = async (data) => {
        try {
            const actionResult = await dispatch(updateFreelancer(data));
            const result = unwrapResult(actionResult);

            if (result) {
                if (client) {
                    await client.upsertUser({
                        id: client.userID,
                        name: freelancer?.firstName + ' ' +  freelancer?.lastName,
                        image: user?.image,
                        email: user?.email
                    });
                }
                enqueueSnackbar("Updated successfully", { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' }); 
        }
    };
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <RHFTextField name='firstName' label='First Name *' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name='lastName' label='Last Name *' />
                </Grid>

                <Grid item xs={12}>
                    <RHFTextField multiline minRows={3} name='experiences' label='Experiences *' />
                </Grid>
                <Grid item xs={12}>
                    <RHFRadioGroup name="gender"
                        id="radios-gender"
                        label="Gender"
                        items={genders}
                        row
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <LoadingButtonStyle
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={updateFeelancerStatus === ACTION_STATUS.LOADING ? true : false}
                        >
                            Save Changes
                        </LoadingButtonStyle>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default UpoadFreelancerFrom;
