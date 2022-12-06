import React, { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Container, Box, Stack, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_STATUS } from '../../constants';
import { getFreelancers, selectFreelancersByNum } from './freelancerSlice';
import FreelancerItem from './FreelancerItem';

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff'
}));

const SectonStyle = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.01)
}));


const TopListFreelancer = () => {
    const { status, freelancerSkkills } = useSelector(state => state.freelancers);
    const dispatch = useDispatch();
    const freelancers = useSelector((state) => selectFreelancersByNum(state, 5));

    useEffect(() => {
        if (status === ACTION_STATUS.IDLE) {
            dispatch(getFreelancers());
        }
    }, [status, dispatch]);

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
                    <Typography variant='h3'>Freelancers List</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Freelancers recommended for you
                    </Typography>
                </Box>
                {freelancers?.length > 0 && (
                    <>
                        <Stack spacing={3}>
                            {freelancers.map((freelancer, index) => (
                                <FreelancerItem freelancer={freelancer} skills={freelancerSkkills?.[index]} />
                            ))}
                        </Stack>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBlock: 4 }}
                        >
                            <ButtonStyle color='success' variant='contained'>BROWSER MORE</ButtonStyle>
                        </Box>
                    </>
                )}
            </Container>
        </SectonStyle>
    )
}

export default TopListFreelancer;
