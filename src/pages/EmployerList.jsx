import React, { useEffect } from 'react';
import { 
    Box,
    Grid, 
    Typography,
    Pagination,
    Stack,
    Container,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';

import { searchEmployers } from '../features/search/searchSlice';
import InputField from '../features/JobListing/InputField';
import { unwrapResult } from '@reduxjs/toolkit';
import { Page } from '../components';
import EmployerItem from '../features/employers/EmployerItem';

const ContainerStyle = styled(Container)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.common.white, 0.1)
}));

const EmployerList = () => {
    const [searchParams] = useSearchParams();
    const { employers, totalEmployerItem, totalEmployerPage } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');

    useEffect(() => {
        async function fetchFreelanacers() {
            try {
                const actionResult = await dispatch(searchEmployers({ keyword: keyword || '', page: page || 1 }));
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
        navigate(`/employers?keyword=${kw}`)
        dispatch(searchEmployers({ keyword: kw, page: 1 }));
    };

    const handlePageChange = (e, page) => {
        navigate(`/employers?keyword=${keyword}&page=${page}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Page title='Search Employer'>
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
                                    {totalEmployerItem > 1 ? `Found ${totalEmployerItem} employers` : `Found ${totalEmployerItem} employer`}
                                </Typography>
                                <Stack spacing={2}>
                                    {employers?.map(item => (
                                        <EmployerItem key={item?._id} employer={item} />
                                    ))}
                                </Stack>
                            </Box>
                            {totalEmployerItem > 5 && (
                                <Box style={{display: 'flex', justifyContent: 'end'}}>
                                    <Pagination
                                        count={totalEmployerPage}
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

export default EmployerList