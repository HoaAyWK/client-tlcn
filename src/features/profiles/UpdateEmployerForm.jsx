import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled, alpha } from '@mui/material/styles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, InputBase } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { RHFTextField, FormProvider, RHFSelect, RHFDateTextField } from '../../components/hook-form';

import { ACTION_STATUS } from '../../constants';
import { refresh, updateEmployer, updateFreelancer } from './profileSlice';
import { getCurrentUser } from '../auth/authSlice';
import { fYMDate } from '../../utils/formatTime';

const TYPES = [{ id: 'Production', name: 'Production' }, { id: 'Product', name: 'Outsourcing' }];

const AddInfoArea = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    paddingBlock: 5,
    border: '1px solid #ccc',
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
        border: '1px solid #000'
    },
    '&:focus': {
        border: `1px solid ${theme.palette.primary.main}`
    },
    marginLeft: 0,
    width: '100%',
    cursor: 'text'
}));

const InputStyle = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        
    },
}));


const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    backgroundColor: theme.palette.success.dark,
    '&:hover': {
        backgroundColor: theme.palette.success.main,
    },
    color: '#fff'
}));

const UpdateEmployerForm = () => {
    const { employer } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { updateEmployerStatus } = useSelector(state => state.profile);

    useEffect(() => {
        if (updateEmployerStatus === ACTION_STATUS.SUCCESSED) {
            dispatch(getCurrentUser());
            dispatch(refresh());
        }
    }, [updateEmployerStatus, dispatch]);

    const FreelancerSchema = Yup.object().shape({
        companyName: Yup.string().required('Comapny Name is required'),
        companySize: Yup.string().required('Company Size is required')
            .test(
                'Is positive?', 
                'Company Size must be greater than 0', 
                (value) => value > 0
            ),
        companyType: Yup.string().required('Company Type is required'),
        foundingDate: Yup.date().required('Founding Date is required'),
    });

    const defaultValues = {
        companyName: employer?.companyName,
        companySize: employer?.companySize,
        companyType: employer?.companyType,
        foundingDate: employer?.foundingDate ? fYMDate(employer?.foundingDate) : null,
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
            const actionResult = await dispatch(updateEmployer(data));
            const result = unwrapResult(actionResult);

            if (result) {
                enqueueSnackbar('Updated successfully', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <RHFTextField name='companyName' label='Company Name *' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name='companySize' label='Company Size *' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelect name='companyType' label='Company Type *' id='select-cmp-type' data={TYPES} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFDateTextField name='foundingDate' label='Fouding Date *' />
                </Grid>
                {/* <Grid item xs={12}>
                    <Stack spacing={2}>
                        <AddInfoArea>
                            <InputStyle sx={{ width: '100%'}} />
                        </AddInfoArea>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Stack spacing={1}>

                            </Stack>
                        </Box>
                    </Stack>
                </Grid> */}
                <Grid item xs={12}>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <LoadingButtonStyle
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={updateEmployerStatus === ACTION_STATUS.LOADING ? true : false}
                        >
                            Save Changes
                        </LoadingButtonStyle>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default UpdateEmployerForm;
