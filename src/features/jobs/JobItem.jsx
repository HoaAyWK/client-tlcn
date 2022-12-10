import React from 'react';
import { styled } from '@mui/material/styles';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Box,
    Typography,
    Stack,
    CardActionArea
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { Iconify, Label } from '../../components';
import { fDate } from '../../utils/formatTime'
import socket from '../../services/socket';
import { addApply } from '../applied/appliedSlice';

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff'
}));

const CardMediaStyle = styled(CardMedia)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: 100
}));

const CardStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows[0],
    cursor: 'pointer',
    backgroundColor: 'inherit',
    marginInlineStart: 2
}));

const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
    paddingBlock: 5,
    width: '100%',
    minHeight: 100,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius
}));

const ItemButton = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[500_24],
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius
}));

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    border: `0.5px solid ${theme.palette.grey[500_48]}`,
    transition: 'all .5s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        border: `0.5px solid ${theme.palette.success.main}`,
    }
}))
 
const JobItem = ({ job, categories }) => {
    const { user, freelancer } = useSelector(state => state.auth);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleClickApply = async (e) => {
        if (!user) {
            return enqueueSnackbar('Please login first!', { variant: 'error' });
        }

        if (!freelancer) {
            return enqueueSnackbar('Only Freelancer can apply!', { variant: 'error' });
        }

        try {
            const data = { freelancer: freelancer.id, job: e.target.value };
            const actionResult = await dispatch(addApply(data));
            const result = unwrapResult(actionResult);

            if (result) {
                const freelancerId = user?.id;
                const username = freelancer?.firstName + " " + freelancer?.lastName;
                const jobId = job?.id;
                const jobName = job?.name;
                const avatar = user?.image;
                socket.emit('apply job', { freelancerId, username, avatar, jobId, jobName, to: job?.employer?.user?.id });
                enqueueSnackbar('Apply successfully', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <Wrapper>
            <BoxStyle>
                <RouterLink to={`/employer/${job?.employer?.id}`}>
                    <CardStyle>
                        <CardMediaStyle
                            component='img'
                            height={80}
                            image={job?.employer?.user?.image ? job?.employer?.user?.image : '/static/images/bg_01.jpg'}
                            alt={job?.name}
                        />
                    </CardStyle>
                </RouterLink>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Stack spacing={0} sx={{ marginInlineStart: 3 }}>
                        <Typography variant='body1'
                            component={RouterLink} to={`/job-detail/${job?.id}`}
                            color='text.primary'
                            sx={{ textDecoration: 'none', fontWeigth: 600 }}
                        >
                            {job?.name.length > 160 ? `${job?.name.slice(0, 160)}...` : job?.name}
                        </Typography>
                        <Typography
                            component={RouterLink}
                            to={`/employer/${job?.employer?.id}`}
                            variant='body2'
                            color='text.secondary'
                            sx={{ textDecoration: 'none', display: 'block' }}
                        
                        >
                            {job?.employer?.companyName}
                        </Typography>
                        {categories?.length > 0 && (
                            <Box sx={{ marginBlockStart: 1 }}>
                                <Stack spacing={1} direction='row'>
                                    {categories.map((category) => (
                                        <Label variant='ghost' color='primary' key={category.id}>
                                            {category.name}
                                        </Label>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                    <Box sx={{ minWidth: '60px' }}>
                        <Stack spacing={0} direction='row'>
                            <Typography variant='h6' sx={{ color: '#00B074' }}>
                                $
                            </Typography>
                            <Typography variant='h6'>
                                {`${job?.price}`}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </BoxStyle>
            <ItemButton 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingInline: 2,
                    paddingBlock: 1
                }}
            >
                <Stack spacing={1} direction='row'>
                    <Iconify icon='uiw:date' width={20} height={20} />
                    <Typography variant='body2' color='text.secondary'>
                        Start
                    </Typography>
                    <Typography variant='body2'>
                        {fDate(job?.startDate)}
                    </Typography>
                </Stack>
                <Stack spacing={1} direction='row'>
                    <Iconify icon='uiw:date' width={20} height={20} />
                    <Typography variant='body2' color='text.secondary'>
                        End
                    </Typography>
                    <Typography variant='body2'>
                        {fDate(job?.expireDate)}
                    </Typography>
                </Stack>
                <ButtonStyle
                    color='success'
                    variant='contained'     
                    onClick={handleClickApply}
                    value={job?.id}
                >
                    Apply
                </ButtonStyle>
            </ItemButton>
        </Wrapper>
    );
}

export default JobItem;
