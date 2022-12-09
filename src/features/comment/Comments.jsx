import React from 'react';
import { Stack, Typography, Divider, Box } from '@mui/material';

import Comment from './Comment';
import AddComment from './AddComment';

const Comments = ({ comments, receiver, getSingleAction }) => {

    return (
        <Box
            sx={{
                marginBlock: 2
            }}
        >
            
            <Typography variant='h4' color='text.secondary'>
                Comments
            </Typography>
            <Divider sx={{ marginBlock: 2 }} />
            <AddComment receiver={receiver} getSingleAction={getSingleAction} />
            {comments?.length > 0 && (
                <>
                    <Divider sx={{ marginBlock: 2 }} />
                    <Stack spacing={2}>
                        {comments.map((comment) => (
                            <Comment key={comment._id} comment={comment} />
                        ))}
                    </Stack>
                </>
            )}
        </Box>
    )
}

export default Comments;
