import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fDate } from '../utils/formatTime'
import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import LetterAvatar from '../components/LetterAvatar';
import ShowMoreParagraph from '../components/ShowMoreParagraph';
import JobInfoLine from '../features/jobs/JobInfoLine'
import {
    Avatar,
    Box,
    Container,
    Grid,
    Paper,
    Tooltip,
    Typography,
    Stack,
    Divider,
    Button
} from '@mui/material';
import { Page, Label } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { jobDetail } from '../features/jobs/jobSlice';
import { useSearchParams } from 'react-router-dom';
import { checkApply } from '../features/applied/appliedSlice';

const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2)
}));

function JobDetail(props) {
    const dispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams();
    const { job } = useSelector(state => state.jobs)
    const navigate = useNavigate()
    const showEmployer = (id) => {
        navigate({
            path: "/employer",
            search: `id=${id}`
        })
    }
    useEffect(() => {
        const id = searchParams.get('id')
        console.log(id)
        if (id) {
            dispatch(jobDetail(id))
            dispatch(checkApply(id))
        }
        
    }, [dispatch])
    return (
        <Container>
            <Page title={`Job ${job?.name}`}>
                <Container maxWidth='xl'>
                    {job && (
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
                                                <LetterAvatar name={job?.employer?.user?.email} />
                                            )}
                                            <Stack spacing={0} sx={{ marginInlineStart: 1 }}>
                                                <Tooltip title={job?.employer?.companyName}>
                                                    <Typography
                                                        
                                                        component={RouterLink}
                                                        to={`/employer?id=${job?.employer?.id}`}
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
                                            justifyContent: 'flex-end',
                                            marginBlockStart: 2
                                        }}
                                    >
                                        <Label variant='outlined' >
                                            <Tooltip title={job?.category?.name} >
                                                <Typography
                                                    component={RouterLink}
                                                    to={`/dashboard/categories`}
                                                    sx={{
                                                        textDecoration: 'none',
                                                    }}
                                                    color='text.primary'
                                                    variant='body1'>
                                                    {job?.category?.name}
                                                </Typography>
                                            </Tooltip>
                                        </Label>
                                    </Box>
                                    <Button variant='contained'>Apply</Button>
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
                            {/* {applieds?.length > 0 && (
                            <Grid item xs={12} md={8}>
                                <Box
                                    sx={{
                                        marginBlockStart: 2,
                                        marginBlockEnd: 1
                                    }}
                                >                              
                                    <Typography variant='body1' color='text.secondary' sx={{ fontWeight: 600, fontSize: '1.2rem', marginBlockStart: 2 }} >
                                        {applieds?.length} {applieds?.length > 1 ? 'Applieds' : 'Applied' }
                                    </Typography>
                                    <Divider />
                                </Box>
                                <Stack spacing={2} sx={{ marginBlockStart: 2 }}>
                                    {applieds?.map((applied) => (
                                        <Applied applied={applied} key={applied?.id} />
                                    ))}
                                </Stack>
                            </Grid>
                        )} */}
                        </Grid>
                    )}
                </Container>
            </Page>
        </Container>
    );
}

export default JobDetail;

