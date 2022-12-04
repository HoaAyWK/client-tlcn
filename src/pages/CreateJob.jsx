import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Page } from '../components';
import { JobForm } from '../features/jobs';


const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
}));

const CreateJob = () => {
    return (
        <Page title={'Create Job'}>
            <Container maxWidth='lg' sx={{ paddingBlockEnd: 3 }}>
                <PaperStyle>
                    <JobForm />
                </PaperStyle>
            </Container>
        </Page>
    )
};

export default CreateJob;