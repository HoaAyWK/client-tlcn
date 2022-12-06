import React from 'react';
import { Stack, Container, Typography, Box, Grid } from '@mui/material';

import { Search } from '../../../components';

const CommonBanner = (props) => {
    const { image, title, subtitle, page } = props;
    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#edf8f5',
                height: '50vh',
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
                <Box component={'img'} sx={{ height: '100%', objectFit: 'cover' }} src={image} alt='bg' />
            </Box>
            <Container maxWidth='lg'>
                <Grid container sx={{ padding: '6.25rem 1rem 12.5rem 1rem', position: 'relative'}}>
                    <Grid item xs={12} sm={5}>
                        <Stack spacing={2}>
                            <Typography style={{ fontSize: '2rem', fontWeight: 600 }}>
                                {title}
                            </Typography>
                            <Typography color='text.secondary' sx={{ fontSize: '1rem', fontWeight: 500}}>
                                {subtitle}
                            </Typography>
                            <Search page={page} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={7} />
                </Grid>
            </Container>
        </Box>
    )
};

export default CommonBanner;