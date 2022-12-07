import React, { useEffect } from 'react';
import { Dialog, Grid, Box, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

import { Iconify } from '../../components';

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff',
    marginBlockStart: 1,
    marginBlockEnd: 2
}));

const CancelledCheckoutDialog = (props) => {
    const { open, handleClose } = props;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <IconButton onClick={handleClose}>
                            <Iconify icon='material-symbols:close' width={25} height={25} />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                    >
                        <Iconify icon='mdi:cancel-circle-outline' color='#FF4842' width={100} height={100} />
                        <Typography variant='body1' color='text.secondary' sx={{ marginBlockEnd: 2 }}>
                            Cancelled Checkout
                        </Typography>
                        <Button color='error' variant='contained' sx={{ marginBlockEnd: 2 }} onClick={handleClose}>CLOSE</Button>
                    </Box>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default CancelledCheckoutDialog;
