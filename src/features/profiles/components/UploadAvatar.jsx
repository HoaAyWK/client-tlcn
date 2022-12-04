import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { InputLabel } from '@mui/material';

const Input = styled('input')({
    display: 'none'
});

const UploadAvatar = (props) => {
  return (
    <>
    <InputLabel>My Account</InputLabel>
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box 
                sx={{ 
                    width: 150, 
                    height: 150, 
                    borderRadius: '50%', 
                    border: '2px dashed rgb(221, 232, 243, 0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 2
                }}
            >
                <label htmlFor='upload-button' style={{ width: '90%', height: '90%', position: 'relative' }}>
                    <Input accept='image/*' type='file' id='upload-button'  />
                    <IconButton  component='span' variant='outlined' sx={{ width: '100%', height: '100%', bgcolor: 'rgb(0, 0, 0, 0.05)', zIndex: '1' }} >
                        <AddAPhotoIcon fontSize='large' />
                    </IconButton >
                        <Card 
                            sx={{ 
                                width: '100%', 
                                height: '100%', 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                borderRadius: '50%', 
                                zIndex: '-1',
                                opacity: '0.5' 
                            }}>                         
                                <CardMedia
                                    component='img'
                                    height='100%'
                                />                                                
                        </Card>
                </label>
            </Box>
            <Typography variant='body1' textAlign='center'>
                Allowed *.jpeg, *.jpg, *.png, *.gif
            </Typography>   
        </Box>
        </>
  )
    
}

export default UploadAvatar