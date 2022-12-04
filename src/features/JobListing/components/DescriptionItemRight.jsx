import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

function DescriptionItemRight({icon, title="Title:", titleDetail="Title Detail"}) {
    return (
        <Box
            display='flex'
            alignItems='center'
            margin='40px'
        >
            <Box marginRight='30px'>
                <Avatar alt="Remy Sharp" 
                    sx={{backgroundColor: 'rgba(2,175,116,.15)', width:'50px', height:'50px'}}
                >
                    <Icon
                        icon={icon} 
                        color="#02af74" 
                        width='30px' 
                        height='30px'
                    />
                </Avatar>
            </Box>
            <Box>
                <Typography fontSize={"18px"} fontWeight="600" color="#74788d">{title}</Typography>
                <Typography fontSize={"18px"} color="#74788d">{titleDetail}</Typography>
            </Box>
        </Box>
    );
}

export default DescriptionItemRight;