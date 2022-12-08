import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Paper, Tab, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Loading, Page } from '../components';
import UserJobTable from '../features/jobs/UserJobTable';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJobs } from '../features/jobs/jobSlice';
import { useLocalStorage } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { ACTION_STATUS } from '../constants';

const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    marginBottom: 15,
    marginBlockStart: 5
}));

const JobManagement = () => {
    const [value, setValue] = useState('1');
    const { myAvailableJobs, myExpiredJobs, appliedPerJobs, jobDetailStatus } = useSelector(state => state.jobs);
    const { employer, getCurrentUserStatus } = useSelector(state => state.auth);
    const [accessToken] = useLocalStorage('accessToken', null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMyJobs());
    }, [dispatch]);

    const handleChangeValue = (e, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!accessToken) {
            navigate('/404', { replace: true });
        }

        if (getCurrentUserStatus === ACTION_STATUS.SUCCESSED && !employer) {
            navigate('/404', { replace: true });
        }
    }, [accessToken, employer, getCurrentUserStatus, navigate]);
    
    if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
        return (
            <Page title='Loading ...'>
                <Loading />
            </Page>
        )
    }

    if (getCurrentUserStatus === ACTION_STATUS.LOADING || jobDetailStatus === ACTION_STATUS.LOADING) {
        return (
            <Page title='Loading ...'>
                <Loading />
            </Page>
        )
    }

    return (
        <Page title='Jobs Management'>
            <Container maxWidth='lg'>
                <Typography
                    variant='h4'
                    color='text.secondary'
                    sx={{ marginBlock: 2 }}
                >
                    Manage Jobs
                </Typography>
                <Divider sx={{ marginBlockEnd: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TabContext value={value}>
                            <PaperStyle>
                                <Box>
                                    <TabList onChange={handleChangeValue} aria-label='account-settings-tabs' textColor='inherit'>
                                        <Tab label='Open' value='1' />
                                        <Tab label='Expire' value='2' />
                                    </TabList>
                                </Box>
                                <TabPanel value='1'>
                                    <UserJobTable jobs={myAvailableJobs} applies={appliedPerJobs} />
                                </TabPanel>
                                <TabPanel value='2'>
                                <UserJobTable jobs={myExpiredJobs} applies={appliedPerJobs} />
                                </TabPanel>
                            </PaperStyle>
                        </TabContext>
                    </Grid>                 
                </Grid>
            </Container>
        </Page>
    )
};

export default JobManagement;
