import React, { useEffect } from 'react';
import { Stack, Container, Typography, Box, Grid, InputBase, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { Page, Search } from '../components';
import CategoryItem from '../features/categories/CategoryItem';
import { getCategories, selectAllCategories } from '../features/categories/categorySlice';
import { ACTION_STATUS } from '../constants';


const Home = () => {
    const categories = useSelector(selectAllCategories);
    const { status: loadCategoriesStatus, countPerCates } = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loadCategoriesStatus === ACTION_STATUS.IDLE) {
            dispatch(getCategories());
        }
    }, [loadCategoriesStatus, dispatch]);

    return (
        <Page title='Home'>
            <Box
                sx={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: '#edf8f5',
                    paddingBlockStart: -15
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%'
                    }}
                >
                    <Box component={'img'} sx={{ height: '100%', objectFit: 'cover' }} src='/static/images/bg-home.png' />
                </Box>
                <Container maxWidth='lg'>
                    <Grid container sx={{ padding: '6.25rem 1rem 12.5rem 1rem', position: 'relative'}}>
                        <Grid item xs={12} sm={5}>
                            <Stack spacing={2}>
                                <Typography style={{ fontSize: '2.5rem', fontWeight: 600 }}>
                                    Find the most existing jobs.
                                </Typography>
                                <Typography color='text.secondary' sx={{ fontSize: '1rem', fontWeight: 500}}>
                                    Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative to
                                </Typography>
                                <Search />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={7} />
                    </Grid>
                </Container>
            </Box>
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
            </Container>
        </Page>
    )
};

export default Home;