import React, { useState } from 'react';
import { Dialog, Grid, Box, Stack, Typography, Button, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { Logo, Iconify } from '../../components';
import FreelancerRegiserForm from './FreelancerRegiserForm';
import EmployerRegisterForm from './EmployerRegisterForm';

const LeftAreaStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    paddingInline: 2,
    paddingBlockStart: 8,
    paddingBlockEnd: 2,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: alpha('#2b3940', 0.9),
    [theme.breakpoints.up('xs')]: {
        display: 'none',
    },
    [theme.breakpoints.up('md')]: {
        display: 'block',
    },
}));


const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff'
}));

const SelectDialog = (props) => {
    const {
        open,
        handleClose,
    } = props;

    const [openFreelancer, setOpenFreelancer] = useState(false);
    const [openEmployer, setOpenEmployer] = useState(false);

    const handleClickFreelancer = () => {
        setOpenFreelancer(true);
        handleClose();
    };

    const handleClickEmployer = () => {
        setOpenEmployer(true);
    };

    const handleCloseFreelancer = () => {
        setOpenFreelancer(false);
    };

    const handleCloseEmployer = () => {
        setOpenEmployer(false);
    };


    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <LeftAreaStyle>
                                <Stack spacing={2}>
                                    <Typography sx={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', color: 'white' }}>
                                        Register Here
                                    </Typography>
                                    <Typography text='color.secondary' varinat='body1' sx={{ textAlign: 'center', color: 'white' }}>
                                        Select Role to Register
                                    </Typography>
                                </Stack>
                                <Box
                                    sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                                >
                                    <Typography variant='body2' color='text.secondary'>New Jobs Posted Today</Typography>
                                    <Typography variant='body2' color='text.secondary'>New Comapnies Registered</Typography>
                                </Box>
                            </LeftAreaStyle>
                        </Grid>
                        <Grid item container xs={12} md={7} spacing={2} >
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={handleClose}>
                                        <Iconify icon='material-symbols:close' width={25} height={25} />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Box sx={{ width: '100%', padding: 2 }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Logo sx={{ width: 200, height: 200 }} display='flex' />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <ButtonStyle
                                                color='success'
                                                variant='contained'
                                                sx={{ minWidth: 220, marginBlockEnd: 4 }}
                                                onClick={handleClickFreelancer}
                                            >
                                                I want to find Jobs
                                            </ButtonStyle>
                                            <Button
                                                color='error'
                                                variant='contained'
                                                sx={{ minWidth: 220 }}
                                                onClick={handleClickEmployer}
                                            >
                                                I want to find Freelancers
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid> 
                </Box>
            </Dialog>
            <FreelancerRegiserForm open={openFreelancer} handleClose={handleCloseFreelancer} />
            <EmployerRegisterForm open={openEmployer} handleClose={handleCloseEmployer} />
        </>
    );
};

export default SelectDialog;