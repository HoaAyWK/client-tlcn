import React, { useEffect, useMemo, useState } from 'react';
import { 
    Box,
    Grid, 
    Typography,
    Pagination,
    Container,
    FormControl,
    FormControlLabel,
    Stack,
    FormGroup,
    Checkbox,
    Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';

import { searchJobs } from '../features/search/searchSlice';
import ItemResult from '../features/JobListing/ItemResult';
import InputField from '../features/JobListing/InputField';
import { Page } from '../components';
import { getCategories, selectAllCategories, selectCategoryIds  } from '../features/categories/categorySlice';
import { ACTION_STATUS } from '../constants';
import CheckboxCategories from '../features/JobListing/CheckboxCategories';


const ContainerStyle = styled(Container)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.common.white, 0.1)
}));

function JobListing() {
    const [searchParams] = useSearchParams();
    const { jobs, totalJobItem, totalJobPage } = useSelector(state => state.search);
    const categories = useSelector(selectAllCategories);
    const categoryIds = useSelector(selectCategoryIds);
    const { status: categoriesStatus } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keyword = searchParams.get('keyword');
    const categoriesQuery = searchParams.get('categories');
    const pickedCategories = categoriesQuery?.split(',') || [];
    const page = searchParams.get('page');
    const categoriesObj = useMemo(() => {
        const obj = {};
        categoryIds.forEach((id) => {
            if (pickedCategories.includes(id)) {
                obj[id] = true;
            } else {
                obj[id] = false;
            }
        });
        return obj;
    }, [pickedCategories]);

    const [selectedCategories, setSelectedCategories] = useState(categoriesObj);
    
    useEffect(() => {
        dispatch(searchJobs({ keyword: keyword || '', page: page || 1, categories: categoriesQuery }));
    }, [keyword, page, dispatch, categoriesQuery]);

    useEffect(() => {
        if (categoriesStatus === ACTION_STATUS.IDLE) {
            dispatch(getCategories());
        }
    }, [categoriesStatus, dispatch]);

    console.log(categoriesObj);

    const methods = useForm({
        defaultValues: {
            jobSearch: keyword || '',
        }
    });
    
    const {
        handleSubmit
    } = methods;
    
    const onSubmit = (data) => {
        navigate(`/jobs?keyword=${data.jobSearch}`)
            dispatch(searchJobs({ keyword: data.jobSearch, page: 1 }));
    };

    const handlePageChange = (e, page) => {
        const kw = keyword || '';
        navigate(`/jobs?keyword=${kw}&page=${page}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleSelectCategories = (e) => {
        setSelectedCategories({
            ...selectedCategories,
            [e.target.name]: e.target.checked,
        });
    };

    const handleClickApply = () => {
        const categoryFitler = Object
            .keys(selectedCategories)
            .filter(sc => selectedCategories[sc])
            .join(',');

        const kw = keyword || '';
        dispatch(searchJobs({ keyword, page: 1, categories: categoryFitler }));

        if (categoryFitler) {
            navigate(`/jobs?keyword=${kw}&categories=${categoryFitler}`);
        } else {
            navigate(`/jobs?keyword=${kw}`);
        }
    };

    return (
        <Page title='Search Job'>
            <ContainerStyle maxWidth='lg'>
                <Grid container spacing={2} sx={{ marginBlockStart: 5 }}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={9}>
                                <InputField 
                                    handleSubmit={handleSubmit} 
                                    onSubmit={onSubmit} 
                                    methods={methods}
                                />
                                <Box
                                    sx={{ minHeight: '100vh' }}
                                >
                                    <Box 
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection:
                                            'column',
                                            justifyContent: 'space-between'
                                        }}>
                                        <Box>
                                            <Typography margin={'45px 0'} variant='h5' fontWeight={600}>
                                                {totalJobItem > 1 ? `Found ${totalJobItem} jobs for you` : `Found ${totalJobItem} job for you`}
                                            </Typography>
                                            {jobs?.map(item => (
                                                <ItemResult
                                                    item={item}
                                                    key={item?._id}
                                                />)
                                            )}
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
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Box sx={{backgroundColor: 'rgba(2,175,116,.15)'}}>
                                    <Typography display='flex' justifyContent='center' alignItems='center' padding={'16px 0 16px'}>
                                        Category
                                    </Typography>
                                </Box>
                                <Stack spacing={1}>
                                    {categories?.length > 0 && (
                                        <>
                                            <FormControl component="fieldset" variant="standard">
                                                <FormGroup>
                                                    {categories.map((cate) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={selectedCategories[cate.id]}
                                                                    name={cate.id}
                                                                    onChange={handleSelectCategories}
                                                                />
                                                            }
                                                            label={cate.name}
                                                        />
                                                    ))}
                                                </FormGroup>
                                                                
                                            </FormControl>
                                            <Button
                                                sx={{ marginBlock: 1 }}
                                                size='small'
                                                color='success'
                                                variant='outlined'
                                                onClick={handleClickApply}
                                            >
                                                Apply
                                            </Button>
                                        </>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={9} >
                        
                    </Grid>
                    <Grid item xs={3}>
                        
                    </Grid>
                </Grid>
            </ContainerStyle>
        </Page>
    );
}

export default JobListing;