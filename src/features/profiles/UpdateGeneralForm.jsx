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

import { RHFTextField, FormProvider, RHFMultiSelect } from '../../components/hook-form';
import AvatarUploader from './AvatarUploader';
import { getSkills, selectAllSkills } from '../skills/skillSlice';
import { ACTION_STATUS } from '../../constants';
import { refresh, updateGeneral } from './profileSlice';
import { getCurrentUser } from '../auth/authSlice';
import { getLatestJobs, getMyJobs } from '../jobs/jobSlice';

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    backgroundColor: theme.palette.success.dark,
    '&:hover': {
        backgroundColor: theme.palette.success.main,
    },
    color: '#fff'
}));

const UpdateGeneralForm = () => {
    const { user, userSkills } = useSelector(state => state.auth);
    const skills = useSelector(selectAllSkills);
    const { status: skillsStatus } = useSelector((state) => state.skills);
    const { updateGeneralStatus } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const uSkills = useMemo(() => {
        return userSkills.map(us => us.skill.id);
    }, [userSkills]);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const actionResult = await dispatch(getSkills());
            } catch (error) {
                console.log(error);
            }
        }
        if (skillsStatus === ACTION_STATUS.IDLE) {
            fetchSkills();
        }
    }, [skillsStatus, dispatch]);

    useEffect(() => {
        if (updateGeneralStatus === ACTION_STATUS.SUCCESSED) {
            dispatch(getCurrentUser());
            dispatch(refresh());
        }
    }, [updateGeneralStatus, dispatch]);

    const GeneralSchema = Yup.object().shape({
        id: Yup.string(),
        email: Yup.string(),
        phone: Yup.string().required('Phone is required'),
        introduction: Yup.string().required('Address is required'),
        address: Yup.string().required('Address is required'),
        image: Yup.mixed(),
        skills: Yup.array().required('Skills is required'),
    });

    const defaultValues = {
        id: user?.id,
        email: user?.email,
        phone: user?.phone,
        introduction: user?.introduction,
        address: user?.address,
        image: '',
        skills: uSkills
    };
    
    const methods = useForm({
        resolver: yupResolver(GeneralSchema),
        defaultValues
    });

    const {
        handleSubmit,
        setFocus
    } = methods;


    const onSubmit = async (data) => {
        try {
            const actionResult = await dispatch(updateGeneral(data));
            const result = unwrapResult(actionResult);
            
            if (result) {
                dispatch(getLatestJobs());
                enqueueSnackbar('Updated successfully', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBlock: 2 }}>
                         <AvatarUploader avatarUrl={user?.image} name='image' setFocus={setFocus} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name='email' label='Email *' disabled={true} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name='phone' label='Phone *' />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField multiline minRows={1} name='address' label='Address *' />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField multiline minRows={3} name='introduction' label='Introduction *' />
                </Grid>
                <Grid item xs={12}>
                    <RHFMultiSelect
                        name='skills'
                        label='Skills *'
                        data={skills}
                        id='select-skills'
                        defaultValue={uSkills}
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
                            loading={updateGeneralStatus === ACTION_STATUS.LOADING ? true : false}
                        >
                            Save Changes
                        </LoadingButtonStyle>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default UpdateGeneralForm;