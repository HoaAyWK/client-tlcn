import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getInforFreelancer } from './userSlice'
import { useSearchParams } from 'react-router-dom'
import { async } from '@firebase/util'
import { unwrapResult } from '@reduxjs/toolkit'

import {
    Box,
    Paper,
    Typography,
    Grid,
    Avatar,
    Stack,
    Rating,
    Divider,
    Tab,
    CardContent,
    Card,
    Collapse,
    ListItemButton,
    ListItemText,
    Link,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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
    const dispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams();
    const { freelancer, user } = useSelector(state => state.user)
    useEffect(() => {
        async function fetchData(id) {
            try {
                const id = searchParams.get('id')
                const r = await dispatch(getInforFreelancer(searchParams.get('id')));
                const res = unwrapResult(r);
                console.log(res)
            } catch (error) {
                console.log(error);

            }
        }
        fetchData()
    }, [])
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} md={4}>
                    <PaperStyle>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}
                        >
                            {user?.image ? (
                                <AvatarStyle src={user.image} alt={user?.email} />
                            ) : (
                                <AvatarStyle>{freelancer?.firstName?.[0]}</AvatarStyle>
                            )}
                            <Typography variant='h6' sx={{ fontSize: '1.5rem', marginBlockStart: 1 }}>
                                {freelancer?.firstName + ' ' + freelancer?.lastName}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>Freelancer</Typography>
                            <Stack direction='row'>
                                <Rating name="rating" value={user?.stars} readOnly precision={0.5} sx={{ marginBlock: 2 }} />
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
                                        {user?.email}
                                    </Typography>
                                </DetailInlineStyle>
                                <DetailInlineStyle>
                                    <TypographyTitleStyle variant='body1' color='text.secondary'>
                                        Phone
                                    </TypographyTitleStyle>
                                    <Typography variant='body1' color='text.primary'>
                                        {user?.phone}
                                    </Typography>
                                </DetailInlineStyle>
                                <DetailInlineStyle>
                                    <TypographyTitleStyle variant='body1' color='text.secondary'>
                                        Gender
                                    </TypographyTitleStyle>
                                    <Typography variant='body1' color='text.primary'>
                                        {freelancer?.gender ? freelancer.gender : 'Male'}
                                    </Typography>
                                </DetailInlineStyle>
                                <DetailInlineStyle>
                                    <TypographyTitleStyle variant='body1' color='text.secondary'>
                                        Address
                                    </TypographyTitleStyle>
                                    <Typography variant='body1' color='text.primary'>
                                        {user?.address}
                                    </Typography>
                                </DetailInlineStyle>
                            </Stack>
                        </Box>

                    </PaperStyle>
                </Grid>
            <Grid item xs={12} sm={7} md={8}>
                <PaperStyle>
                    <TabContext value={1}>
                        <Box >
                            <TabList aria-label='account-settings-tabs' textColor='inherit'>
                                <Tab label='Overview' value='1' />
                            </TabList>
                        </Box>
                        <Typography variant='h6' sx={{ paddingBlock: 2 }}>
                                About
                            </Typography>
                            <CardStyle>
                                <CardContent>
                                    <Typography variant='body1'>
                                        {user?.introduction}
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
                                {/* {userSkills.map((uk) => (
                                    <Label variant='ghost' color='primary' key={uk.id}>
                                        {uk?.skill.name}
                                    </Label>
                                ))} */}
                            </Stack>
                        
                    </TabContext>
                </PaperStyle>
            </Grid>
            </Grid>
        </Container>
    )
}

export default FreelancerDetail