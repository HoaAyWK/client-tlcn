import React from 'react';
import { styled, alpha } from '@mui/material';
import {
    Box,
    Container,
    Stack,
    Button,
    Typography,
    Avatar,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Iconify, Label } from '../../components';
import { fDate, fDateTime } from '../../utils/formatTime';
import { useChatContext } from 'stream-chat-react';
import { useSnackbar } from 'notistack';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    border: `0.5px solid ${theme.palette.grey[500_24]}`,
    transition: 'all .5s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        border: `0.5px solid ${theme.palette.success.dark}`,
    }
}));

const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 10,
    paddingBlock: 5,
    width: '100%',
    minHeight: 100,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    [theme.breakpoints.up('xs')]: {
        width: 60,
        height: 60
    },
    [theme.breakpoints.up('md')]: {
        width: 80,
        height: 80
    }
}));

const JobApply = ({ apply }) => {
    const { client, setActiveChannel } = useChatContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleClickContact = async (e) => {
        if (client) {
            const conversation = client.channel('messaging', {
                members: [e.target.value, client.userID]
            });
    
            await conversation.watch();
            setActiveChannel(conversation);
            navigate('/messaging');
        } else {
            enqueueSnackbar('Something went wrong!', { variant: 'error' });
        }
    }

    return (
        <Wrapper>
            <BoxStyle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RouterLink to={`/employer/${apply?.job?.employer?._id}`}>
                        <AvatarStyle src={apply?.job?.employer?.user?.image} alt={apply?.job?.employer?.companyName} />
                    </RouterLink>
                    <Stack spacing={0.5} sx={{ marginInlineStart: 2 }}>
                        <Stack direction='row' spacing={1}>
                            <Typography
                                component={RouterLink}
                                to={`/job-detail/${apply?.job?._id}`}
                                variant='body1'
                                color='text.primary'
                                sx={{ fontWeight: 600, textDecoration: 'none' }}
                            >
                                {apply?.job?.name}
                            </Typography>
                        </Stack>
                        <Typography
                            component={RouterLink}
                            to={`/employer/${apply?.job?.employer?._id}`}
                            variant='body2'
                            color='text.primary'
                            sx={{ textDecoration: 'none' }}
                        >
                            {apply?.job?.employer?.companyName}
                        </Typography>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Stack direction='row' spacing={0.5}>
                        <Iconify icon='ic:outline-access-time' width={24} height={24} />
                        <Typography variant='body1' color='text.secondary'>
                            {fDateTime(apply?.appliedAt)}
                        </Typography>
                    </Stack>
                    <Button color='success'
                        value={apply?.job?.employer?.user?._id}
                        onClick={handleClickContact}
                    >
                        Contact
                    </Button>
                </Box>
            </BoxStyle>
        </Wrapper>
    );
}

export default JobApply;