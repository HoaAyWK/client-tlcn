import React from 'react';
import { Grid, Box, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

import { FormProvider, RHFTextField, RHFDateTextField, RHFMultiSelect } from '../../components/hook-form';
import { fYMDate } from '../../utils/formatTime';

const categories = [{ id: 1, name: "Web development" }, { id: 2, name: "Design UI/UX" }];

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    color: '#fff'
}));

const JobForm = () => {
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
        defaultValues
    });

    const {
        handleSubmit
    } = methods;

    const onSubmit = async (data) => {
        console.log(data);
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
                <RHFMultiSelect name="categories" data={categories} id="categories" label="Categories" />
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