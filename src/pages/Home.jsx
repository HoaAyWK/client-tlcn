import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { Page } from '../components';
import CategoryItem from '../features/categories/CategoryItem';
import { getCategories, selectAllCategories } from '../features/categories/categorySlice';
import { ACTION_STATUS, ROLES } from '../constants';
import GuestBanner from '../features/home/GuestBanner';
import EmployerBanner from '../features/home/EmployerBanner';
import LatestJobsList from '../features/jobs/LatestJobsList';
import TopListFreelancer from '../features/freelancers/TopListFreelancer';
import ConfirmEmailDialog from '../features/auth/ConfirmEmailDialog';


const Home = () => {
    const [openConfirm ,setOpenConfirm] = useState(false);
    const categories = useSelector(selectAllCategories);
    const { status: loadCategoriesStatus, countPerCates } = useSelector(state => state.categories);
    const { user, confirmEmailStatus } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        if (loadCategoriesStatus === ACTION_STATUS.IDLE) {
            dispatch(getCategories());
        }
    }, [loadCategoriesStatus, dispatch]);

    useEffect(() => {
        if (confirmEmailStatus === ACTION_STATUS.SUCCESSED) {
            setOpenConfirm(true);
        }
    }, [confirmEmailStatus]);

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    return (
        <Page title='Home'>
            {user?.role === ROLES.EMPLOYER ? (
                <>
                    <EmployerBanner page='freelancers' />
                    <TopListFreelancer />
                </>
            ) : (
                <>
                    <GuestBanner page='jobs' />
                    <LatestJobsList />
                </>
            )}
            <Container maxWidth='lg'>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBlockEnd: 2,
                        flexDirection: 'column',
                        marginBlockStart: 5
                    }}
                >
                    <Typography variant='h3'>Browser Jobs Categories</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Post a job to tell us about your project. We'll quickly match you with the right freelancers.
                    </Typography>
                </Box>
                <Grid container spacing={2} sx={{ marginBlockStart: 5 }}>
                    {categories?.length > 0 && (
                        categories.map((category) => (
                            <Grid item xs={6} md={4} lg={3} key={category.id}>
                                <CategoryItem category={category} countPerCates={countPerCates}/>
                            </Grid>
                        ))
                    )}
                </Grid>
                <ConfirmEmailDialog open={openConfirm} handleClose={handleCloseConfirm} />
            </Container>
        </Page>
    )
};

export default Home;