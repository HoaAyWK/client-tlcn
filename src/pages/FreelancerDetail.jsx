import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Avatar,
    Stack,
    Rating,
    Divider,
    CardContent,
    Card,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Label, Loading, Page } from '../components';
import { getSingleFreelancer } from '../features/freelancers/freelancerSlice';
import { ACTION_STATUS } from '../constants';
import { Container } from '@mui/system';
import { getReceiverComments } from '../features/comment/commentSlice';
import Comments from '../features/comment/Comments';


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

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        width: '100px',
        height: '100px',
        fontSize: '2.5rem'
    },
    [theme.breakpoints.up('md')]: {
        width: '120px',
        height: '120px',
        fontSize: '3rem'
    },
}));

const DetailInlineStyle = styled(Box)(({ theme }) => ({
    display: 'flex'
}));

const TypographyTitleStyle = styled(Typography)(({ theme }) => ({
    minWidth: 100
}));

const CardStyle = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.grey[500_12],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0]
}));


const FreelancerDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { freelancerSingle: freelancer, singleFreelancerStatus } = useSelector((state) => state.freelancers);
    const { receiverComments } = useSelector((state) => state.comments);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(getSingleFreelancer(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (freelancer) {
            dispatch(getReceiverComments(freelancer?.user?._id));
        }
    }, [freelancer, dispatch]);

    if (singleFreelancerStatus !== ACTION_STATUS.SUCCESSED) {
        return (
            <Page title='Loading ...'>
                <Loading />
            </Page>
        );
    }

    if (user?.id === freelancer?.user._id) {
        navigate('/profile', { replace: true });
    }
    
    console.log(freelancer);

    return (
        <Page title={`Freelancer ${freelancer?.firstName} ${freelancer.lastName}`}>
            <Container maxWidth='lg'>
                <Typography
                    variant='h4'
                    color='text.secondary'
                    sx={{ marginBlock: 2 }}
                >
                    Freelancer Details
                </Typography>
                <Divider sx={{ marginBlockEnd: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={4}>
                        <PaperStyle>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}
                            >
                                {freelancer?.user?.image ? (
                                    <AvatarStyle src={freelancer?.user.image} alt={freelancer?.user?.email} />
                                ) : (
                                    <AvatarStyle>{freelancer?.firstName?.[0]}</AvatarStyle>
                                )}
                                <Typography variant='h6' sx={{ fontSize: '1.5rem', marginBlockStart: 1 }}>
                                    {freelancer?.firstName + ' ' + freelancer?.lastName}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>Freelancer</Typography>
                                <Stack direction='row'>
                                    <Rating name="rating" value={freelancer?.user?.stars} readOnly precision={0.5} sx={{ marginBlock: 2 }} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant='body1' color='text.secondary'>
                                            {`(${freelancer?.user?.numRating ? freelancer?.user?.numRating : '0'})`}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box sx={{ paddingInline: 2 }}>
                                <Divider />
                            </Box>
                            <Box sx={{ paddingInline: 2 }}>
                                <Typography variant='h6' sx={{ marginBlock: 2 }}>
                                    Details
                                </Typography>
                                <Stack spacing={2}>
                                    <DetailInlineStyle>
                                        <TypographyTitleStyle variant='body1' color='text.secondary'>
                                            Email
                                        </TypographyTitleStyle>
                                        <Typography variant='body1' color='text.primary'>
                                            {freelancer?.user?.email}
                                        </Typography>
                                    </DetailInlineStyle>
                                    <DetailInlineStyle>
                                        <TypographyTitleStyle variant='body1' color='text.secondary'>
                                            Phone
                                        </TypographyTitleStyle>
                                        <Typography variant='body1' color='text.primary'>
                                            {freelancer?.user?.phone}
                                        </Typography>
                                    </DetailInlineStyle>
                                    <DetailInlineStyle>
                                        <TypographyTitleStyle variant='body1' color='text.secondary'>
                                            Gender
                                        </TypographyTitleStyle>
                                        <Typography variant='body1' color='text.primary'>
                                            {freelancer?.gender ? freelancer.gender : 'Male' }
                                        </Typography>
                                    </DetailInlineStyle>
                                    <DetailInlineStyle>
                                        <TypographyTitleStyle variant='body1' color='text.secondary'>
                                            Address
                                        </TypographyTitleStyle>
                                        <Typography variant='body1' color='text.primary'>
                                            {freelancer?.user?.address}
                                        </Typography>
                                    </DetailInlineStyle>
                                </Stack>
                            </Box>

                        </PaperStyle>
                    </Grid>
                    <Grid item xs={12} sm={7} md={8}>
                        <PaperStyle>
                            <Typography variant='h6' sx={{ paddingBlock: 2 }}>
                                About
                            </Typography>
                            <CardStyle>
                                <CardContent>
                                    <Typography variant='body1'>
                                        {freelancer?.user?.introduction}
                                    </Typography>
                                </CardContent>
                            </CardStyle>
                            <Typography variant='h6' sx={{ paddingBlock: 2 }}>
                                Experiences
                            </Typography>
                            {freelancer?.doneJobs && (
                                <CardStyle>
                                    <CardContent>
                                        <Typography variant='body1'>
                                            {freelancer.doneJobs}
                                        </Typography>
                                    </CardContent>
                                </CardStyle >
                            )}
                            <Typography variant='h6' sx={{ paddingBlock: 2 }}>
                                Skills
                            </Typography>
                            <Stack spacing={1} direction='row'>
                                {freelancer?.userSkills?.map((uk) => (
                                    <Label variant='ghost' color='primary' key={uk.id}>
                                        {uk?.skill.name}
                                    </Label>
                                ))}
                            </Stack>
                        </PaperStyle>
                        <Comments comments={receiverComments} receiver={freelancer?.user?._id} getSingleAction={getSingleFreelancer} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default FreelancerDetail;
