import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Page } from '../components';
import { JobForm } from '../features/jobs';

const BoxTitleAreaStyle = styled(Box)(({ theme }) => ({
    position: 'relative',
    paddingBlockStart: '255px',
    paddingBlockEnd: '110px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: '#029663',
}));

const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    marginBottom: 15
}));

const CreateJob = () => {
    return (
        <Page title={'Create Job'}>
            <Box
                sx={{ width: '100%'}}
            >
                <section style={{
                        backgroundImage: 'url(/static/images/page-title.png)',
                        position: 'relative',
                        paddingBlockStart: '200px',
                        paddingBlockEnd: '110px',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundColor: '#029663',
                    }}
                >
                    <Container maxWidth='lg'>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography sx={{ fontSize: '2rem', color: 'white', fontWeight: 600, textTransform: 'uppercase' }}>
                                Create New Job
                            </Typography>
                        </Box>
                    </Container>
                </section>
            </Box>
            <Container maxWidth='lg' sx={{ paddingBlockEnd: 3, marginBlockStart: 10 }}>
                <PaperStyle>
                    <JobForm />
                </PaperStyle>
            </Container>
        </Page>
    )
};

export default CreateJob;