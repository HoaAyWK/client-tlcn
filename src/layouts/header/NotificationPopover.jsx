import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import {
    Box,
    List,
    Badge,
    Button,
    Avatar,
    Tooltip,
    Divider,
    Typography,
    IconButton,
    ListItemText,
    ListSubheader,
    ListItemAvatar,
    ListItemButton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { fToNow } from '../../utils/formatTime';
import { Iconify, Scrollbar, MenuPopover } from '../../components';
import socket from '../../services/socket';

const renderContent = (notification) => {
    const title = (
        <Typography variant="subtitle2">
            {notification.username}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                &nbsp; 'has applied your job'
            </Typography>
        </Typography>
    );

    return {
        avatar: notification.avatar ? <img alt={notification.username} src={notification.avatar} /> : null,
        title,
    };
};

const NotificationItem = ({ notification }) => {
    const { avatar, title } = renderContent(notification);

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(!notification.isRead && {
                bgcolor: 'action.selected',
                }),
            }}
            >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                <Typography
                    variant="caption"
                    sx={{
                    mt: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.disabled',
                    }}
                >
                    <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
                    {fToNow(notification.applyDate)}
                </Typography>
                }
            />
        </ListItemButton>
    );
};

const BoxScrollStyle = styled(Box)(({ theme }) => ({
    '&::-webkit-scrollbar': {
        width: 10,
        height: 6
    }
}));

NotificationItem.propTypes = {
    notification: PropTypes.shape({
        createdAt: PropTypes.instanceOf(Date),
        id: PropTypes.string,
        isUnRead: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
        avatar: PropTypes.any,
    }),
};

const NotificationPopover = ({ notifications, handleRead, unreadMessages }) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(null);

    const newNotifications = useMemo(() => {
        return notifications.filter(e => e.isRead === false);
    }, [notifications]);

    const oldNotifications = useMemo(() => {
        return notifications.filter(e => e.isRead === true);
    }, [notifications]);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };
    
    const handleClose = () => {
        socket.emit('mark all as read', {});
        handleRead();
        setOpen(null);
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                color={open ? 'primary' : 'default'}
                onClick={handleOpen}
                sx={{ width: 45, height: 45 }}
            >
                <Badge badgeContent={unreadMessages} color="error">
                    <Iconify icon="eva:bell-fill" width={28} height={28} />
                </Badge>
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">Notifications</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            You have {unreadMessages} unread messages
                        </Typography>
                    </Box>

                    {unreadMessages > 0 && (
                        <Tooltip title=" Mark all as read">
                        <IconButton color="primary">
                            <Iconify icon="eva:done-all-fill" width={20} height={20} />
                        </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ height: { xs: 340, sm: 400, }, overflowY: 'scroll' }} >
                    {newNotifications.length > 0 && (
                        <List
                            disablePadding
                            subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                New
                            </ListSubheader>
                            }
                        >
                            {newNotifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))}
                        </List>
                    )}

                    <List
                        disablePadding
                        subheader={
                        <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                            Before that
                        </ListSubheader>
                        }
                    >
                        {oldNotifications.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </List>
                </Box>
            </MenuPopover>
        </>
    );
};

export default NotificationPopover;