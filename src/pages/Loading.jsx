import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { Page } from '../components';

const Loading = () => {
    return (
        <Page title='Loading...'>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <CircularProgress />
            </Box>
        </Page>
    );
};

export default Loading;
