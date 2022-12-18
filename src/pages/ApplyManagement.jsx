import React, { useEffect, useState } from 'react';
import { Container, Box, Pagination, Paper, Stack, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '../hooks';
import { Loading, Page } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_STATUS } from '../constants';
import { getMyApplies } from '../features/applied/appliedSlice';
import JobApply from '../features/applied/JobApply';


const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    marginBottom: 15,
    marginBlockStart: 5,
    minHeight: '80vh',
    position: 'relative'
}));

const ApplyManagement = () => {
    const { getCurrentUserStatus, freelancer } = useSelector(state => state.auth);
    const { myApplies, totalMAPage, totalMAItem, getMyAppliesStatus } = useSelector(state => state.applied);
    const [accessToken] = useLocalStorage('accessToken', null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;

    useEffect(() => {
        if (getMyAppliesStatus === ACTION_STATUS.IDLE) {
            dispatch(getMyApplies(1));
        }
    }, [getMyAppliesStatus, dispatch]);

    useEffect(() => {
        dispatch(getMyApplies(page));
    }, [page, dispatch]);

    useEffect(() => {
        if (!accessToken) {
            navigate('/404', { replace: true });
        }

        if (getCurrentUserStatus === ACTION_STATUS.SUCCESSED && !freelancer) {
            navigate('/404', { replace: true });
        }
    }, [accessToken, freelancer, getCurrentUserStatus, navigate]);

    const handlePageChange = (e, page) => {
        navigate(`/my-applies?page=${page}`)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
        return (
            <Page title='Loading ...'>
                <Loading />
            </Page>
        )
    }

    return (
        <Page title='My Applies'>
            <Container maxWidth='lg'>
                <Typography
                    variant='h4'
                    color='text.secondary'
                    sx={{ marginBlock: 2 }}
                >
                    My Applies
                </Typography>
                <Divider sx={{ marginBlockEnd: 2 }} />
                <PaperStyle>
                    {myApplies?.length > 0 ? (
                        <Stack spacing={2} sx={{ marginBlockEnd: 5 }}>
                            {myApplies.map((apply) => (
                                <JobApply apply={apply} key={apply?._id} />
                            ))}
                        </Stack>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '50vh',
                                padding: 5
                            }}
                        >
                            <Typography variant='h4' color='text.secondary'>
                                You don't have any applies
                            </Typography>
                        </Box>
                    )}
                    {totalMAPage > 1 && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBlockEnd: 2,
                                position: 'absolute',
                                bottom: 0,
                                right: 10,
                            }}
                        >
                            <Pagination
                                count={totalMAPage}
                                variant="outlined"
                                color="success"
                                onChange={handlePageChange}
                            />
                        </Box>
                    )}
                </PaperStyle>
            </Container>
        </Page>
    )
}

export default ApplyManagement;
