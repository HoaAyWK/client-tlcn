import { 
    Box,
    Grid, 
    Typography,
    Pagination} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import ItemResult from '../features/JobListing/ItemResult';
import InputField from '../features/JobListing/InputField';
import CheckboxCategories from '../features/JobListing/CheckboxCategories';

const MOCK_DATA_TEST = {
    category: [
        {
            value: 1,
            label: 'category1'
        },
        {
            value: 2,
            label: 'category2'
        },
        {
            value: 3,
            label: 'category3'
        },
        {
            value: 4,
            label: 'category4'
        },
        {
            value: 5,
            label: 'category5'
        }
    ],
    jobs_des: [
        {
            id: 2,
            title: 'Title2',
            des: 'Short Destination2',
            location: 'Location2',
            timed: 'Timed2'
        },
        {
            id: 3,
            title: 'Title3',
            des: 'Short Destination3',
            location: 'Location3',
            timed: 'Timed3'
        },
        {
            id: 4,
            title: 'Title4',
            des: 'Short Destination4',
            location: 'Location4',
            timed: 'Timed4'
        },
        {
            id: 5,
            title: 'Title5',
            des: 'Short Destination5',
            location: 'Location5',
            timed: 'Timed5'
        }
    ]
}


function JobListing() {

    const methods = useForm({
        defaultValues: {
            jobSearch: ''
        }
    })
    
    const {
        handleSubmit
    } = methods;
    
    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <Box>
            <Box sx={{
                height: '300px',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#029663',
                marginBottom: '4.5rem'
            }}>
                <Typography 
                    variant='h4' 
                    sx={{color: 'white', fontWeight:'500'}}
                >
                    Job Listing
                </Typography>
            </Box>
            <Box marginBottom={'50px'}>
            <Grid container sx={{ width: '90%', margin:'auto'}} spacing={4}>
                <Grid item xs={9}>
                    <InputField 
                        handleSubmit={handleSubmit} 
                        onSubmit={onSubmit} 
                        methods={methods}
                    />
                    <Grid>
                        <Typography margin={'30px 0'} variant='h5'>Search Results</Typography>
                        {MOCK_DATA_TEST.jobs_des.map(item => <ItemResult 
                            item={item}
                        />)}
                    </Grid>
                    <Stack spacing={2} style={{display: 'flex', justifyContent: 'end'}}>
                        <Pagination count={10} variant="outlined" />
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{backgroundColor: 'rgba(2,175,116,.15)'}}>
                        <Typography display='flex' justifyContent='center' alignItems='center' padding={'16px 0 16px'}>
                            Category
                        </Typography>
                    </Box>
                    <Box padding={'20px'}>
                        <CheckboxCategories 
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            methods={methods}
                            data={MOCK_DATA_TEST.category}
                        />
                    </Box>
                </Grid>
            </Grid>
            </Box>
        </Box>
    );
}

export default JobListing;