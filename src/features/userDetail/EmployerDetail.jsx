import React, { useState } from 'react';
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
    Link
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit'
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Iconify, Label } from '../../components';
import { fDate } from '../../utils/formatTime';
import { getInfoEmployer } from './userSlice';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@mui/system';
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
    const dispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams();
    const { employer } = useSelector(state => state.user)
    useEffect(() => {
        const id = searchParams.get('id')
        if (id) {
            console.log(id)
            async function fetchData(id) {
                try {
                    const id = searchParams.get('id')
                    const r = await dispatch(getInfoEmployer(searchParams.get('id')));
                    const res = unwrapResult(r);
                    console.log(res)
                } catch (error) {
                    console.log(error);

                }
            }
            fetchData()
        }
    }, [dispatch])
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} md={4}>
                    <PaperStyle>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}
                        >
                            {employer?.user?.image ? (
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
                        <TabContext value='1'>
                            <Box >
                                <TabList aria-label='account-settings-tabs' textColor='inherit'>
                                    <Tab label='Overview' value='1' />
                                </TabList>
                            </Box>
                            <TabPanel value='1'>
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
                                            {employer?.foundingDate && (
                                                <Typography variant='body1' color='text.primary'>
                                                    {fDate(employer?.foundingDate)}
                                                </Typography>
                                            )}
                                        </IconWithTextStyle>
                                    </Grid>
                                </Grid>
                                {/* {userSkills?.length > 0 && (
                                    <>
                                        <Typography variant='h6' sx={{ paddingBlock: 2 }}>
                                            Job Skills
                                        </Typography>
                                        <Stack spacing={1} direction='row'>
                                            {userSkills.map((uk) => (
                                                <Label variant='ghost' color='primary' key={uk.id}>
                                                    {uk?.skill.name}
                                                </Label>
                                            ))}
                                        </Stack>
                                    </>
                                )} */}
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
                            </TabPanel>

                        </TabContext>
                    </PaperStyle>
                </Grid>
            </Grid>
        </Container>
    )
}

export default EmployerDetail