import React, { useEffect } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Avatar, Box, Container, Grid, Paper, Tooltip, Typography, Stack, Divider, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import JobInfoLine from '../features/jobs/JobInfoLine'
import { fDate } from '../utils/formatTime'
import { Page, Label, Loading, LetterAvatar, ShowMoreParagraph } from '../components'
import { jobDetail } from '../features/jobs/jobSlice';
import { checkApply } from '../features/applied/appliedSlice';
import { ACTION_STATUS, ROLES } from '../constants';
import Apply from '../features/applied/Apply';
import socket from '../services/socket';
import { addApply } from '../features/applied/appliedSlice';

const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2)
}));

function JobDetail() {
    const dispatch = useDispatch()
    const { job, jobApplies, jobCategories, jobDetailStatus } = useSelector(state => state.jobs);
    const { user, employer, freelancer } = useSelector(state => state.auth);
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (id) {
            dispatch(jobDetail(id))
            // dispatch(checkApply(id))
        }
        
    }, [id, dispatch]);

    const handleApply = async (e) => {
        if (!freelancer || !user) {
            enqueueSnackbar('Please login first!', { variant: 'error' });
        } else {
            try {
                const data = { freelancer: freelancer?.id, job: e.target.value };
                const actionResult = await dispatch(addApply(data));
                const result = unwrapResult(actionResult);
    
                if (result) {
                    const freelancerId = user?.id;
                    const username = freelancer?.firstName + " " + freelancer?.lastName;
                    const jobId = job?._id;
                    const jobName = job?.name;
                    const avatar = user?.image;
                    socket.emit('apply job', { freelancerId, username, avatar, jobId, jobName, to: job?.employer?.user?._id });
                    enqueueSnackbar('Apply successfully', { variant: 'success' });
                }
    
            } catch (error) {
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }

    };


    if (jobDetailStatus !== ACTION_STATUS.SUCCESSED) {
        return (
            <Page title={`Job ...`}>
                <Loading />
            </Page>
        )
    }


    return (
        <Page title={`Job ${job?.name}`}>
            <Container maxWidth='lg'>
                {job && (
                    <>
                        <Typography
                            variant='h4'
                            color='text.secondary'
                            sx={{ marginBlock: 2 }}
                        >
                            Job Details
                        </Typography>
                        <Divider sx={{ marginBlockEnd: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <PaperStyle>
                                    <Stack spacing={1}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography variant='h4' sx={{ fontWeight: 700, lineHeight: 1.5 }}>
                                                {job?.name}
                                            </Typography>
                                            <Box>
                                                <Label variant='ghost' color='info'>
                                                    {fDate(job?.createdAt)}
                                                </Label>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {job?.employer?.user?.image ? (
                                                <Avatar src={job.employer.user.image} alt={job?.name} />
                                            ) : (
                                                <LetterAvatar name={job?.employer?.companyName} />
                                            )}
                                            <Stack spacing={0} sx={{ marginInlineStart: 1 }}>
                                                <Tooltip title={job?.employer?.companyName}>
                                                    <Typography
                                                        
                                                        component={RouterLink}
                                                        to={`/employer/${job?.employer?._id}`}
                                                        color='text.primary'
                                                        sx={{
                                                            textDecoration: 'none',
                                                            fontWeight: 600
                                                        }}
                                                        variant='body2'
                                                    >
                                                        {job?.employer?.companyName}
                                                    </Typography>
                                                </Tooltip>
                                                <Typography variant='caption' color='text.secondary'>{job?.employer?.user?.email}</Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    <Divider sx={{ marginBlock: 2 }} />
                                    <ShowMoreParagraph text={job?.description} line={2} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            marginBlock: 2
                                        }}
                                    >
                                        {jobCategories?.length > 0 && (
                                            <Stack direction='row' spacing={1}>
                                                {jobCategories.map((cate) => (
                                                    <Label variant='ghost' color='warning' >
                                                        <Tooltip title={cate?.category?.name} >
                                                            <Typography
                                                                component={RouterLink}
                                                                to={`/categories`}
                                                                sx={{
                                                                    textDecoration: 'none',
                                                                }}
                                                                color='#7A4F01'
                                                                variant='body1'>
                                                                {cate?.category?.name}
                                                            </Typography>
                                                        </Tooltip>
                                                    </Label>
                                                ))}
                                            </Stack>
                                        )}
                                    </Box>
                                    {user?.role !== ROLES.EMPLOYER && (
                                        <Button
                                            variant='contained'
                                            onClick={handleApply}
                                            value={job?._id}
                                        >
                                            Apply
                                        </Button>
                                    )}
                                </PaperStyle>
                                
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <PaperStyle>
                                    <Stack spacing={2}>
                                        <JobInfoLine
                                            icon='fluent-mdl2:status-circle-inner'
                                            iconStyle={{
                                                color: (job?.status ? '#00b074' : '#ff1744')
                                            }}
                                            title='Status'
                                            content={job?.status ? 'Open' : 'Closed'}
                                        />
                                        <JobInfoLine
                                            icon='bxs:dollar-circle'
                                            iconStyle={{ color: '#00b074' }}
                                            title='Budget'
                                            content={`$${job?.price}`}
                                        />
                                        <JobInfoLine
                                            icon='ant-design:calendar-twotone'
                                            iconStyle={{ color: '#651fff' }}
                                            title='Start Date'
                                            content={fDate(job?.startDate)}
                                        />
                                        <JobInfoLine
                                            icon='ant-design:calendar-twotone'
                                            iconStyle={{ color: '#b22a00' }}
                                            title='Expire Date'
                                            content={fDate(job?.expireDate)}
                                        />
                                    </Stack>
                                </PaperStyle>
                            </Grid>
                            {employer?.id === job?.employer?._id && (
                               jobApplies?.length > 0 && (
                                    <Grid item xs={12} md={8}>
                                        <Box
                                            sx={{
                                                marginBlockStart: 2,
                                                marginBlockEnd: 1
                                            }}
                                        >                              
                                            <Typography variant='body1' color='text.secondary' sx={{ fontWeight: 600, fontSize: '1.2rem', marginBlockStart: 2 }} >
                                                {jobApplies?.length} {jobApplies?.length > 1 ? 'jobApplies' : 'Applied' }
                                            </Typography>
                                            <Divider />
                                        </Box>
                                        <Stack spacing={2} sx={{ marginBlockStart: 2 }}>
                                            {jobApplies?.map((applied) => (
                                                <Apply applied={applied} key={applied?.id} />
                                            ))}
                                        </Stack>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </>
                )}
            </Container>
        </Page>
    );
}

export default JobDetail;

