import React, { useEffect } from 'react';
import { 
    Box,
    Grid, 
    Typography,
    Pagination,
    Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';

import { searchJobs } from '../features/search/searchSlice';
import ItemResult from '../features/JobListing/ItemResult';
import InputField from '../features/JobListing/InputField';
import { Page } from '../components';


const ContainerStyle = styled(Container)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.common.white, 0.1)
}));

function JobListing() {
    const [searchParams] = useSearchParams();
    const { jobs, totalJobItem, totalJobPage } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');
    
    useEffect(() => {
        dispatch(searchJobs({ keyword: keyword || '', page: page || 1 }));
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
        navigate(`/jobs?keyword=${data.jobSearch}`)
            dispatch(searchJobs({ keyword: data.jobSearch, page: 1 }));
    };

    const handlePageChange = (e, page) => {
        navigate(`/jobs?keyword=${keyword}&page=${page}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Page title='Search Job'>
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
                                    {totalJobItem > 1 ? `Found ${totalJobItem} jobs for you` : `Found ${totalJobItem} job for you`}
                                </Typography>
                                {jobs?.map(item => <ItemResult 
                                    item={item}
                                />)}
                            </Box>
                            {totalJobItem > 5 && (
                                <Box style={{display: 'flex', justifyContent: 'end'}}>
                                    <Pagination
                                        count={totalJobPage}
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

export default JobListing;