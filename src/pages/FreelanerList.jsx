import React, { useEffect } from 'react';
import { 
    Box,
    Grid, 
    Typography,
    Pagination,
    Stack,
    Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';

import { searchFreelancers } from '../features/search/searchSlice';
import InputField from '../features/JobListing/InputField';
import CheckboxCategories from '../features/JobListing/CheckboxCategories';
import { unwrapResult } from '@reduxjs/toolkit';
import { Page } from '../components';
import FreelancerItem from '../features/freelancers/FreelancerItem';

const ContainerStyle = styled(Container)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.common.white, 0.1)
}));

const FreelanerList = () => {
    const [searchParams] = useSearchParams();
    const { freelancers, totalFreelancerItem, totalFreelancerPage } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');

    useEffect(() => {
        async function fetchFreelanacers() {
            try {
                const actionResult = await dispatch(searchFreelancers({ keyword: keyword || '', page: page || 1 }));
                const result = unwrapResult(actionResult);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }

        fetchFreelanacers();

    }, [keyword, page, dispatch]);

    const methods = useForm({
        defaultValues: {
            jobSearch: keyword,
        }
    })
    
    const {
        handleSubmit
    } = methods;
    
    const onSubmit = (data) => {
        const kw = data.jobSearch || '';
        navigate(`/freelancers?keyword=${kw}`)
            dispatch(searchFreelancers({ keyword: kw, page: 1 }));
    };

    const handlePageChange = (e, page) => {
        const kw = keyword || '';
        navigate(`/freelancers?keyword=${kw}&page=${page}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Page title='Search Freelancer'>
            <ContainerStyle maxWidth='md'>
                <Grid container spacing={2} sx={{ marginBlockStart: 5 }}>
                    <Grid item xs={12}>
                        <InputField 
                            handleSubmit={handleSubmit} 
                            onSubmit={onSubmit} 
                            methods={methods}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ minHeight: '100vh' }}>
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography margin={'45px 0'} variant='h5' fontWeight={600}>
                                    {totalFreelancerItem > 1 ? `Found ${totalFreelancerItem} freelancers` : `Found ${totalFreelancerItem} freelancer`}
                                </Typography>
                                <Stack spacing={2}>
                                    {freelancers?.map(item => (
                                        <FreelancerItem key={item?._id} freelancer={item} />
                                    ))}
                                </Stack>
                            </Box>
                            {totalFreelancerItem > 5 && (
                                <Box style={{display: 'flex', justifyContent: 'end'}}>
                                    <Pagination
                                        count={totalFreelancerPage}
                                        variant="outlined"
                                        color='success'
                                        onChange={handlePageChange}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        
                    </Grid>
                </Grid>
            </ContainerStyle>
        </Page>
    );
}

export default FreelanerList