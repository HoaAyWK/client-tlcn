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
    Link,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Iconify, Label, Loading, Page } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleEmployer } from '../features/employers/employerSlice';
import { ACTION_STATUS } from '../constants';
import { fDate } from '../utils/formatTime';
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

const IconWithTextStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
}));

const CardStyle = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.grey[800_12],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0]
}));

const EmployerDetail = () => {
    const { id } = useParams();
    
    const { user } = useSelector(state => state.auth);
    const { getSingleStatus, employerSingle: employer } = useSelector((state) => state.employers);
    const { receiverComments } = useSelector((state) => state.comments);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(getSingleEmployer(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (employer) {
            dispatch(getReceiverComments(employer?.user?._id));
        }
    }, [employer, dispatch]);
    
    if (getSingleStatus !== ACTION_STATUS.SUCCESSED) {
        return (
            <Page title='Loading ...'>
                <Loading />
            </Page>
        )
    }

    if (user?.id === employer?.user._id) {
        navigate('/profile', { replace: true });
    }

    return (
        <Page title={`Employer ${employer?.companyName}`}>
            <Container maxWidth='lg'>
                <Typography
                    variant='h4'
                    color='text.secondary'
                    sx={{ marginBlock: 2 }}
                >
                    Employer Details
                </Typography>
                <Divider sx={{ marginBlockEnd: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={4}>
                        <PaperStyle>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}
                            >
                                {user?.image ? (
                                    <AvatarStyle src={employer?.user.image} alt={employer?.user?.email} />
                                ) : (
                                    <AvatarStyle>{employer?.companyName?.[0]}</AvatarStyle>
                                )}
                                <Typography variant='h6' sx={{ fontSize: '1.5rem', marginBlockStart: 1 }}>
                                    {employer?.companyName}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>Employer</Typography>
                                <Stack direction='row'>
                                    <Rating name="rating" value={employer?.user?.stars} readOnly precision={0.5} sx={{ marginBlock: 2 }} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant='body1' color='text.secondary'>
                                            {`(${employer?.user?.numRating ? employer?.user?.numRating : '0'})`}
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
                                            {employer?.user?.email}
                                        </Typography>
                                    </DetailInlineStyle>
                                    <DetailInlineStyle>
                                        <TypographyTitleStyle variant='body1' color='text.secondary'>
                                            Phone
                                        </TypographyTitleStyle>
                                        <Typography variant='body1' color='text.primary'>
                                            {employer?.user?.phone}
                                        </Typography>
                                    </DetailInlineStyle>             
                                    <DetailInlineStyle>
                                        <TypographyTitleStyle variant='body1' color='text.secondary'>
                                            Address
                                        </TypographyTitleStyle>
                                        <Typography variant='body1' color='text.primary'>
                                            {employer?.user?.address}
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
                                        {employer?.user?.introduction}
                                    </Typography>
                                </CardContent>
                            </CardStyle>
                            <Typography variant='h6' sx={{ paddingBlock: 2 }}>
                                Company Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <IconWithTextStyle>
                                        <Iconify icon='mdi:company' width={25} height={25} />
                                        <Typography variant='body1' color='text.secondary' sx={{ marginInline: 1, minWidth: 80 }}>
                                            Size
                                        </Typography>
                                        <Typography variant='body1' color='text.primary'>
                                            {` ${employer?.companySize} Employees`}
                                        </Typography>
                                    </IconWithTextStyle>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <IconWithTextStyle>
                                        <Iconify icon='gridicons:product' width={25} height={25} />
                                        <Typography variant='body1' color='text.secondary' sx={{ marginInline: 1, minWidth: 80 }}>
                                            Type
                                        </Typography>
                                        <Typography variant='body1' color='text.primary'>
                                            {employer?.companyType}
                                        </Typography>
                                    </IconWithTextStyle>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <IconWithTextStyle>
                                        <Iconify icon='uiw:date' width={25} height={25} />
                                        <Typography variant='body1' color='text.secondary' sx={{ marginInline: 1, minWidth: 80 }}>
                                            Founded
                                        </Typography>
                                        <Typography variant='body1' color='text.primary'>
                                            {fDate(employer?.foundingDate)}
                                        </Typography>
                                    </IconWithTextStyle>
                                </Grid>
                            </Grid>
                            {employer?.info?.length > 0 && (
                                <>
                                    <Typography variant='h6' sx={{ paddingBlock: 2 }}>
                                        Links
                                    </Typography>
                                    <Stack spacing={1}>
                                        {employer?.info.map((item) => (
                                            <IconWithTextStyle>
                                                <Iconify icon='mdi:link-variant' width={25} height={25} />
                                                <Link href={item} sx={{ marginInlineStart: 1 }}>{item}</Link>
                                            </IconWithTextStyle>
                                        ))}
                                    </Stack>
                                </>
                            )}
                        </PaperStyle>
                        <Comments comments={receiverComments} receiver={employer?.user?._id} getSingleAction={getSingleEmployer} />    
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default EmployerDetail;
