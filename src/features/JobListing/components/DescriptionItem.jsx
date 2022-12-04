import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

function DescriptionItem({title="Title", detailTitle="detail Title"}) {
    return (
        <Grid item xs>
            <Box sx={{padding:'10px', border: '1px solid #eff0f2'}}>
                <Typography fontSize={20} variant='subtitle1'>{title}:</Typography>
                <Typography 
                    fontFamily='system-ui' 
                    fontWeight={200} 
                    fontSize={20}
                >
                    {detailTitle}
                </Typography>
            </Box>
        </Grid>
    );
}

export default DescriptionItem;