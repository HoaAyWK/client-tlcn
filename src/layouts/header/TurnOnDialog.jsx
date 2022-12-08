import React from 'react';
import { Dialog, Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Iconify } from '../../components';

const BoxStyle = styled(Box)(({ theme }) => ({
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}));

const TurnOnDialog = (props) => {
    const { open, handleClose, title, handleConfirm, iconColor } = props;

    return (
        <Dialog maxWidth='sm' open={open} onClose={handleClose}>
            <BoxStyle>    
                <Stack direction='row' spacing={1} sx={{ marginBlockStart: 3 }}>
                    <Iconify
                        icon='pajamas:status-active'
                        width={36} height={36}
                        sx={{
                           color: iconColor 
                        }}
                    />
                    <Typography variant='h4' color='text.secondary'>
                        {title}
                    </Typography>
                </Stack>
                <Box sx={{ marginBlock: 2 }}>
                    <Button
                        color='primary'
                        onClick={handleConfirm}
                        variant='contained'
                    >
                        Confirm
                    </Button>
                </Box>
            </BoxStyle>
        </Dialog>
    );
};

export default TurnOnDialog;
