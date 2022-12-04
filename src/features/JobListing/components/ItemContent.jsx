import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

function ItemContent({title="My every thing"}) {
    return (
        <CardContent sx={{
            display: 'flex',
            alignItems:'center',
            padding: '5px 24px',
            fontSize: '25px'
        }}>
            <Icon icon="radix-icons:dot"/>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>
        </CardContent>
    );
}

export default ItemContent;