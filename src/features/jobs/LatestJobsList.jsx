import React, { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Container, Box, Stack, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { ACTION_STATUS } from '../../constants';
import { getLatestJobs } from './jobSlice';
import JobItem from './JobItem';
import { useNavigate } from 'react-router-dom';

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff'
}));

const SectonStyle = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.01)
}));

const LatestJobsList = () => {
    const { latestJobs, latestJobCategories, latestJobStatus } = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (latestJobStatus === ACTION_STATUS.IDLE) {
            dispatch(getLatestJobs());
        }
    }, [latestJobStatus, dispatch]);

    return (
        <SectonStyle>
            <Container maxWidth='md' sx={{ paddingBlock: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginBlockEnd: 5
                    }}
                >
                    <Typography variant='h3'>Latest Jobs</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Latest jobs in 5Jobs
                    </Typography>
                </Box>
                {latestJobs?.length > 0 && (
                    <>
                        <Stack spacing={3}>
                            {latestJobs.slice(0, 5).map((job, index) => (
                                <JobItem key={job.id} job={job} categories={latestJobCategories?.[index]} />
                            ))}
                        </Stack>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBlock: 4 }}
                        >
                            <ButtonStyle
                                color='success'
                                variant='contained'
                                onClick={() => navigate('/jobs')}
                            >
                                BROWSER MORE
                            </ButtonStyle>
                        </Box>
                    </>
                )}
            </Container>
        </SectonStyle>
    )
};

export default LatestJobsList;