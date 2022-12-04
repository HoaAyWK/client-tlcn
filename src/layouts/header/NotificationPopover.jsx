import React, { useState, useRef } from 'react';
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

import { fToNow } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

const NOTIFICATIONS = [
    {
        id: '123',
        title: 'Your order is placed',
        description: 'waiting for shipping',
        avatar: null,
        type: 'order_placed',
        createdAt: set(new Date(), { hours: 10, minutes: 30 }),
        isUnRead: true,
    },
]

const renderContent = (notification) => {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                &nbsp; {notification.description}
            </Typography>
        </Typography>
    );

    return {
        avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
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
                ...(notification.isUnRead && {
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
                    {fToNow(notification.createdAt)}
                </Typography>
                }
            />
        </ListItemButton>
    );
};

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

const NotificationPopover = () => {
    const anchorRef = useRef(null);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };
    
    const handleClose = () => {
        setOpen(null);
    };
    
    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
            ...notification,
            isUnRead: false,
            }))
        );
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                color={open ? 'primary' : 'default'}
                onClick={handleOpen}
                sx={{ width: 45, height: 45 }}
            >
                <Badge badgeContent={totalUnRead} color="error">
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
                        You have {totalUnRead} unread messages
                    </Typography>
                </Box>

                {totalUnRead > 0 && (
                    <Tooltip title=" Mark all as read">
                    <IconButton color="primary" onClick={handleMarkAllAsRead}>
                        <Iconify icon="eva:done-all-fill" width={20} height={20} />
                    </IconButton>
                    </Tooltip>
                )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
                <List
                    disablePadding
                    subheader={
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                        New
                    </ListSubheader>
                    }
                >
                    {notifications.slice(0, 2).map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </List>

                <List
                    disablePadding
                    subheader={
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                        Before that
                    </ListSubheader>
                    }
                >
                    {notifications.slice(2, 5).map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </List>
                </Scrollbar>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1 }}>
                <Button fullWidth disableRipple>
                    View All
                </Button>
                </Box>
            </MenuPopover>
        </>
    );
};

export default NotificationPopover;