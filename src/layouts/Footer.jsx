import React from 'react';
import { Container, Grid, Box, Typography, Stack, Paper } from '@mui/material';
import { Logo } from '../components';

const services = ['Find Job', 'Create Post', 'Manage Post', 'Profile'];
const company = ['About Us', 'Contact Us'];
const supports = ['University Of Technology And Education', 'Faculty For High Quality Training', 'Faculty For Information Technology'];

const Footer = () => {
    return (
        <Paper sx={{marginTop: 'calc(5% + 0px)',
            width: '100%',
            position: 'relative'
            }} component="footer" square
        >
            <Container maxWidth='none' sx={{ bgcolor: '#2b3940'}}>
                <Grid container sx={{ paddingBlock: 5 }} spacing={0}>
                    <Grid item xs={12} sm={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Logo sx={{ width: '250px' }} display='inline-block'/>
                            <Typography variant='h4' color='white' sx={{ paddingBlock: 1 }}>
                                Contact us at
                            </Typography>
                            <Typography variant='h4' color='#00b074'>
                                buidinhxuanit@gmail.com
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Stack spacing={2} sx={{ paddingInline: 1 }}>
                                <Typography variant='h4' color='#00b074'>
                                    Services
                                </Typography>
                                {services.map((service) => (
                                    <Typography key={service} variant='by1' color='white'>
                                        {service}
                                    </Typography>
                                ))}
                            </Stack>
                            <Stack spacing={2} sx={{ paddingInline: 1 }}>
                                <Typography variant='h4' color='#00b074'>
                                    Company
                                </Typography>
                                {company.map((cmp) => (
                                    <Typography key={cmp} variant='by1' color='white'>
                                        {cmp}
                                    </Typography>
                                ))}
                            </Stack>
                            <Stack spacing={2} sx={{ paddingInline: 1 }}>
                                <Typography variant='h4' color='#00b074'>
                                    Support
                                </Typography>
                                {supports.map((support) => (
                                    <Typography key={support} variant='by1' color='white'>
                                        {support}
                                    </Typography>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

export default Footer;