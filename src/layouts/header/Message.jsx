import React, { useRef, useState } from 'react';
import {
    Badge,
    IconButton,
} from '@mui/material';

import { Iconify } from '../../components';

const Message = () => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    return (
        <IconButton
            ref={anchorRef}
            color={open ? 'primary' : 'default'}
            sx={{ width: 45, height: 45 }}
        >
            <Badge badgeContent={3} color="error">
                <Iconify icon="eva:message-circle-fill" width={28} height={28} />
            </Badge>
        </IconButton>
    )
};

export default Message;