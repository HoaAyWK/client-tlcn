import React from 'react';
import { Stack, Container, Typography, Box, Grid, InputBase, Button } from '@mui/material';

import { Page, Search } from '../components';



const Home = () => {
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
                        <Grid item xs={5}>
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
                        <Grid item xs={7} />
                    </Grid>
                </Container>
            </Box>
        </Page>
    )
};

export default Home;