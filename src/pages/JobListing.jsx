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
            label: 'Freelance'
        },
        {
            value: 2,
            label: 'Part Time'
        },
        {
            value: 3,
            label: 'Full Time'
        },
        {
            value: 4,
            label: 'Internship'
        },
        {
            value: 5,
            label: 'Internship1'
        }
    ],
    jobs_des: [
        {
            id: 2,
            title: 'Product Director',
            des: 'Short Destination2',
            location: 'Ho Chi Minh, Quan 2',
            timed: '5 hours ago'
        },
        {
            id: 3,
            title: 'Digital Marketing Manager',
            des: 'Short Destination3',
            location: 'Ho Chi Minh, Quan 1',
            timed: 'now'
        },
        {
            id: 4,
            title: 'Product Director',
            des: 'Short Destination4',
            location: 'Ho Chi Minh, Quan 3',
            timed: '1 minute ago'
        },
        {
            id: 5,
            title: 'Senior Backend Developer',
            des: 'Short Destination5',
            location: 'Ba Huyen Thanh Quan, Quan 4',
            timed: '3 hours ago'
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
                marginBottom: '2.5rem'
            }}>
                <Typography 
                    variant='h4' 
                    sx={{color: 'white', fontWeight:'500'}}
                >
                    Job Listing
                </Typography>
            </Box>
            <Box marginBottom={'30px'}>
            <Grid container sx={{ width: '90%', margin:'auto'}} spacing={4}>
                <Grid item xs={9}>
                    <InputField 
                        handleSubmit={handleSubmit} 
                        onSubmit={onSubmit} 
                        methods={methods}
                    />
                    <Grid>
                        <Typography margin={'45px 0'} variant='h5' fontWeight={600}>Search Results</Typography>
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