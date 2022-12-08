import React from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography, Paper, Stack, Tooltip, Button, Grid, Rating } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useChatContext } from 'stream-chat-react';

import { LetterAvatar } from '../../components';
import { fToNow } from '../../utils/formatTime';
import { useSnackbar } from 'notistack';

const PaperStyle = styled(Paper)(({ theme }) => ({
    color: theme.palette.main,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    padding: theme.spacing(1),
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    border: `0.5px solid ${theme.palette.grey[500_24]}`,
    transition: 'all .5s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        border: `0.5px solid ${theme.palette.success.dark}`,
    }
}));

const Apply = ({ applied }) => {
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
    };

    return (
        <PaperStyle>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5}>
                    <Stack spacing={1} direction='row'>
                        {applied?.freelancer?.user?.image ? (
                            <RouterLink to={`/freelancers/${applied?.freelancer?._id}`}>
                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 50,
                                            md: 70
                                        },
                                        height: {
                                            xs: 50,
                                            md: 70
                                        }
                                    }}
                                    src={applied?.freelancer?.user?.image}
                                    alt={applied?.freelancer?.firstName}
                                />
                            </RouterLink>
                        ) : (
                            <RouterLink to={`/freelancers/${applied?.freelancer?._id}`}>
                                <LetterAvatar name={applied?.freelancer?.firstName} />
                            </RouterLink>
                        )}
                        <Stack spacing={0}>
                            <Tooltip title={`${applied?.freelancer?.firstName} ${applied?.freelancer?.lastName}`}>
                                <Typography
                                    component={RouterLink}
                                    to={`/freelancers/${applied?.freelancer?._id}`}
                                    color='text.primary'
                                    sx={{
                                        textDecoration: 'none',
                                        fontWeight: 600
                                    }}
                                    variant='body1'
                                >
                                    {`${applied?.freelancer?.firstName} ${applied?.freelancer?.lastName}`}
                                </Typography>
                            </Tooltip>
                            <Typography variant='body2' color='text.secondary'>
                                {applied?.freelancer?.user?.email}
                            </Typography>
                            <Box sx={{ marginBlock: 0.5 }}>
                                <Rating name="read-only" value={4} precision={0.5} readOnly size='small' />
                            </Box>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>

                </Grid>
                <Grid item xs={12} sm={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                        }}
                    >
                        <Typography variant='body2' textAlign='center' color='text.secondary'>
                            {`apply ${fToNow(applied?.appliedAt)}`}
                        </Typography>
                        <Stack direction='row' spacing={0.5}>
                            <Button
                                color='success'
                                size='small'
                                value={applied.freelancer?.user?._id}
                                onClick={handleClickContact}
                            >
                                Contact
                            </Button>
                            <Button
                                color='primary'
                                size='small'
                            >
                                View Profile
                            </Button>
                        </Stack>
                    </Box>

                </Grid>
            </Grid>
        </PaperStyle>
    );
};

export default Apply;