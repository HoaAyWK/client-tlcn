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
        navigate(`/employers?keyword=${data.jobSearch}`)
            dispatch(searchEmployers({ keyword: data.jobSearch, page: 1 }));
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
            <ContainerStyle maxWidth='lg'>
                <Grid container spacing={2} sx={{ marginBlockStart: 5 }}>
                    <Grid item xs={12} sm={9}>
                        <InputField 
                            handleSubmit={handleSubmit} 
                            onSubmit={onSubmit} 
                            methods={methods}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{backgroundColor: 'rgba(2,175,116,.15)'}}>
                            <Typography display='flex' justifyContent='center' alignItems='center' padding={'16px 0 16px'}>
                                Category
                            </Typography>
                        </Box>
                        <Box>
                            {/* <CheckboxCategories 
                                handleSubmit={handleSubmit}
                                onSubmit={onSubmit}
                                methods={methods}
                            /> */}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={9} sx={{ minHeight: '100vh' }}>
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography margin={'45px 0'} variant='h5' fontWeight={600}>
                                    {totalEmployerItem > 1 ? `Found ${totalEmployerItem} jobs for you` : `Found ${totalEmployerItem} job for you`}
                                </Typography>
                                <Stack spacing={2}>
                                    {employers?.map(item => (
                                        <EmployerItem employer={item} />
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