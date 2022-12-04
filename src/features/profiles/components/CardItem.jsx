import React from 'react'
import { Avatar, Box, Rating, Typography } from '@mui/material';
import ContactIcon from './ContactIcon';

const CardItem = (props) => (
  <Box>
    <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
      <Avatar sx={{ width: 72, height: 72 }}>{props?.linkUrl ?? 'JD'}</Avatar>
    </Box>
    <Box sx={{textAlign: 'center', width: '100%'}}>
      <Typography sx={{ paddingTop: 2 }}>{props.name ?? 'Joe Doe'}</Typography>
      <Rating name="read-only" value={props.rating ?? 5} readOnly sx={{ paddingTop: 2 }}/>
      <ContactIcon  sx={{ paddingTop: 2 }}></ContactIcon>
    </Box>
    
  </Box>
)

export default CardItem