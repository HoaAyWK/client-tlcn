import React from 'react';
import {
    Badge,
    IconButton,
} from '@mui/material';

import { Iconify } from '../../components';
import { useNavigate } from 'react-router-dom';

const Message = ({ news }) => {
    const num = news || 0;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/messaging');
    };

    return (
        <IconButton
            sx={{ width: 45, height: 45 }}
            onClick={handleClick}
        >
            <Badge badgeContent={num} color="error">
                <Iconify icon="eva:message-circle-fill" width={28} height={28} />
            </Badge>
        </IconButton>
    )
};

export default Message;