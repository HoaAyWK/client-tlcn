import { Grid, Box, Card, Typography, CardContent, Chip, Stack, Avatar } from '@mui/material';
import React from 'react';
import LogoCompany from './../features/JobListing/components/LogoCompany';
import DescriptionItem from './../features/JobListing/components/DescriptionItem';
import DescriptionItemRight from './../features/JobListing/components/DescriptionItemRight';
import MainContent from '../features/JobListing/MainContent';
import CardCustom from '../features/JobListing/components/CardCustom';

function JobDetail(props) {
    return (
        <Box sx={{width: '80%', margin:'auto', marginBottom: '50px'}}>
            <Grid container spacing={4}>
                <Grid item xs={8} paddingBottom='50px'>
                    <Card sx={{padding:'20px'}}>
                        <Box sx={{ display: 'flex', alignItems:'center', margin: '20px 0'}}>
                            <Box sx={{marginRight: '40px'}}>
                                <LogoCompany  width='60px' height='60px'/>
                            </Box>
                            <Box>
                                <Typography variant='h4'>Product Designer / UI Designer</Typography>
                                <Typography variant='p'>Product Designer / UI Designer</Typography>
                            </Box>
                        </Box>
                        <hr style={{color: '#eff0f2', marginBottom:'20px'}}/>
                        <Box sx={{ margin: '20px 0'}}>
                           <Grid container spacing={2}>
                                <DescriptionItem />
                                <DescriptionItem />
                                <DescriptionItem />
                                <DescriptionItem />
                           </Grid>
                        </Box>
                        <MainContent/>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <CardCustom subtitle="Job Overview" isApply/>
                    <CardCustom subtitle="Contact Us"/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default JobDetail;

