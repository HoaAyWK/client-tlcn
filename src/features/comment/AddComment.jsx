import React, { useState } from 'react';
import { Avatar, Grid, Paper, Rating, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFTextField } from '../../components/hook-form';
import { addComment, getReceiverComments } from './commentSlice';

const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    padding: theme.spacing(1),
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    border: `0.5px solid ${theme.palette.grey[500_24]}`,
}));

const AddComment = ({ receiver, getSingleAction }) => {
    const { id } = useParams();
    const [ratingValue, setRatingValue] = useState(1);
    const { user } = useSelector(state => state.auth);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const CommentSchema = Yup.object().shape({
        content: Yup.string().required('Content is required')
    });

    const defaultValues = {
        content: '',
    };

    const methods = useForm({
        resolver: yupResolver(CommentSchema),
        defaultValues
    });

    const {
        handleSubmit,
        reset,
    } = methods;

    const onSubmit = async (data) => {
        if (!user) {
            enqueueSnackbar('Please login first!', { variant: 'error' });
        } else {
            data['star'] = ratingValue;
            data['sender'] = user?.id;
            data['receiver'] = receiver;
            
            try {
                const actionResult = await dispatch(addComment(data));
                const result = unwrapResult(actionResult);

                if (result) {
                    enqueueSnackbar('Added comment', { variant: 'success' });
                    dispatch(getSingleAction(id));
                    dispatch(getReceiverComments(receiver));
                    setRatingValue(1);
                    reset();
                }
            } catch (error) {
                enqueueSnackbar('Something went wrong', { varaint: 'error' });
            }  
        }
    };

    return (
        <PaperStyle>
            <Grid container spacing={1}>
                <Grid item xs={1.5} sm={2} md={1.5}>
                    <Avatar
                        sx={{
                            width: {
                                xs: 50,
                                md: 70
                            },
                            height: {
                                xs: 50,
                                md: 70
                            }
                        }}
                        src={user?.image}
                        alt={'avatar'}
                    />
                </Grid>
                <Grid item xs={10.5} sm={10} md={10.5}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Rating
                                name='select-stars'
                                value={ratingValue}
                                onChange={(e, value) => {
                                    setRatingValue(value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <RHFTextField multiline rows={1} name='content' placeholder='Add comment ...' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button color='success' type='submit'>Submit</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </FormProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PaperStyle>
    )
};

export default AddComment;
