import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Avatar } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
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


const AvatarStyle = styled(Avatar)(({ theme }) => ({
    borderRadius: '0%',
    padding: 2,
    [theme.breakpoints.up('xs')]: {
        with: 100,
        height: 'auto'
    },
    [theme.breakpoints.up('md')]: {
        width: 150,
        height: 'auto'
    },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SectionStyle = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.01),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBlockEnd: 2,
    flexDirection: 'column',
    marginBlockStart: 5,
}));


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
                <Grid container sx={{ marginBlockStart: 5 }}>
                    <Grid item xs={12}>
                        <BoxStyle>
                            <Typography variant='h3' sx={{ marginBlock: 2 }}>
                                Get hired in top companies
                            </Typography>
                        </BoxStyle>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BoxStyle>
                            <AvatarStyle src='/static/images/fhq_logo.png' />
                        </BoxStyle>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BoxStyle>  
                            <AvatarStyle src='/static/images/ute_logo.png' />
                        </BoxStyle>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BoxStyle>
                            <AvatarStyle src='/static/images/fit_logo.png' />
                        </BoxStyle>
                    </Grid>
                </Grid>
                <SectionStyle>
                    <Typography variant='h3' sx={{ marginBlockStart: 5 }}>Browser Jobs Categories</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Post a job to tell us about your project. We'll quickly match you with the right freelancers.
                    </Typography>
                </SectionStyle>
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