import React from 'react';
import { Dialog, Grid, Box, Typography, Button, IconButton } from '@mui/material';

import { Iconify } from '../../components';

const ConfirmEmailDialog = (props) => {
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
                        <Iconify icon='material-symbols:mail-outline-rounded' width={100} height={100} />
                        <Typography variant='body1' color='text.secondary' sx={{ marginBlockEnd: 2 }}>
                            {`We just sent an confirm to your email`}
                        </Typography>
                        <Button color='error' variant='contained' sx={{ marginBlockEnd: 2 }} onClick={handleClose}>CLOSE</Button>
                    </Box>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default ConfirmEmailDialog