import { Grid } from '@mui/material'
import React from 'react'
import CardItem from './CardItem';
import RightContent from './RightContent';

const Avatar = () => {
  return (
    <Grid container>
        <Grid item xs={4}>
            <CardItem></CardItem>
        </Grid>
        <Grid item xs={8}>
            <RightContent></RightContent>
        </Grid>
    </Grid>
   
  )
}

export default Avatar