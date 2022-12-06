import React, { useEffect } from 'react';
import { Grid, Box, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFTextField, RHFDateTextField, RHFMultiSelect } from '../../components/hook-form';
import { fYMDate } from '../../utils/formatTime';
import { getCategories, selectAllCategories } from '../categories/categorySlice';
import { ACTION_STATUS } from '../../constants';
import { createJob } from './jobSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    color: '#fff'
}));

const JobForm = () => {
    const categories = useSelector(selectAllCategories);
    const { status: loadCategoriesStatus } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (loadCategoriesStatus === ACTION_STATUS.IDLE) {
            dispatch(getCategories());
        }
    }, [loadCategoriesStatus, dispatch]);

    const JobSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is reuquired'),
        price: Yup.number().required('Price is required'),
        startDate: Yup.date().required('Start Date is required'),
        expireDate: Yup.date().required('Expire Date is required'),
        categories: Yup.array()
    });

    let now = new Date();

    const defaultValues = {
        name: '',
        description: '',
        price: '',
        startDate: fYMDate(now),
        expireDate: fYMDate(now),
        categories: []
    };

    const methods = useForm({
        resolver: yupResolver(JobSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
    } = methods;

    const onSubmit = async (data) => {
        try {
            const actionResult = await dispatch(createJob(data));
            const result = unwrapResult(actionResult);

            if (result) {
                enqueueSnackbar('Created successfully', { variant: 'success' });
                reset();
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <RHFTextField name='name' label='Name *' />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField name='description' label='Description *' multiple rows={5} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFDateTextField name='startDate' label='Start Date *' type='date' />
                </Grid> 
                <Grid item xs={12} md={4}>
                    <RHFDateTextField name='expireDate' label='Expire Date *' type='date' />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFTextField
                        name='price'
                        type='number'
                        label='Price *'
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                <RHFMultiSelect
                    name="categories"
                    data={categories}
                    id="categories"
                    label="Categories"
                    defaultValue={[]}
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
                            color='success'
                        >
                            Post Now
                        </LoadingButtonStyle>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default JobForm;