import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Avatar, Grid, Typography, Stack, Box, Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { fToNow } from '../../utils/formatTime';
import { ShowMoreParagraph } from '../../components';

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
}));

const Comment = ({ comment, type }) => {
    const baseURL = type === 'freelancer' ? '/freelancer/' : '/employer/';
    const id = comment?.sender?.freelancer ? 
        comment?.sender?.freelancer._id 
        : comment?.sender?.employer._id;

    const name = comment?.sender?.freelancer ? 
        `${comment?.sender?.freelancer?.firstName} ${comment?.sender?.freelancer?.lastName}`
        : `${comment?.sender?.employer?.companyName}`;
    
    const image = comment?.sender?.freelancer?.user ?
        comment?.sender?.freelancer?.user?.image
        : comment?.sender?.employer?.user?.image;

    return (
        <PaperStyle>
            <Grid container spacing={1}>
                <Grid item xs={1.5} sm={2} md={1.5}>
                    <RouterLink to={`${baseURL}${id}`}>
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
                            src={image}
                            alt={name}
                        />
                    </RouterLink>
                </Grid>
                <Grid item xs={10.5} sm={10} md={10.5}>
                    <Stack spacing={0.5}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                {name}
                            </Typography>
                            <Typography variant='body1'>
                                {fToNow(comment?.createdAt)}
                            </Typography>
                        </Box>
                        <Rating name="rating" value={comment?.star} readOnly size='small' />
                        <ShowMoreParagraph text={comment?.content} />
                    </Stack>
                </Grid>
            </Grid>
        </PaperStyle>
    )
}

export default Comment;