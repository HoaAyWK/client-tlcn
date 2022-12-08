import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

import Header from './header/Header';
import Footer from './Footer';
import socket from '../services/socket';
import { useLocalStorage } from '../hooks';
import { ACTION_STATUS } from '../constants';
import { getCurrentUser } from '../features/auth/authSlice';

const API_KEY = process.env.REACT_APP_STREAM_API_KEY;

const RootStyle = styled('div')({
    minHeight: '100%',
    overflow: 'hidden'
});

export default function Layout() {
    const [accessToken] = useLocalStorage('accessToken', null);
    const [streamToken] = useLocalStorage('streamToken', null);
    const [sessionId] = useLocalStorage('sessionId', null);
    const [client, setClient] = useState(null);
    const [unreadStreamMessages, setUnreadStreamMessages] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const { user, userData, getCurrentUserStatus } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (getCurrentUserStatus === ACTION_STATUS.IDLE && accessToken) {
            dispatch(getCurrentUser());
        }
    }, [accessToken, getCurrentUserStatus]);

    useEffect(() => {
        if (userData !== null && streamToken !== null) {

            let didUserConnectInterrupt = false;
            const clientChat = StreamChat.getInstance(API_KEY);

            const connectionPromise = clientChat.connectUser(userData, streamToken).then(() => {
                if (!didUserConnectInterrupt) setClient(clientChat);
            });

            return () => {
                didUserConnectInterrupt = true;
                setClient(null);

                connectionPromise
                    .then(() => clientChat.disconnectUser())
                    .then(() => {
                         console.log('connection closed');
                });
            } 
        }
    }, [userData, streamToken]);

    useEffect(() => {
        if (user) {
            if (sessionId) {
                socket.auth = { sessionId };
                socket.connect();                
            } else {
                socket.auth = { userId: user.id };
                socket.connect();

                socket.on("session", ({ sessionId, socketId }) => {
                    console.log("listen session event")
                    socket.auth = { sessionId };
                    localStorage.setItem('sessionId', JSON.stringify(sessionId));
                    socket.socketId = socketId;
                });
            }

            socket.on('notifications', ({ notifications, newMessages }) => {
                console.log('listen on notifications')
                setNotifications(notifications);
                console.log(newMessages);
                setUnreadMessages(newMessages);
                console.log(notifications);
            });

            socket.on('apply job', (message) => {
                console.log('listen on apply job')
                setUnreadMessages(prev => prev + 1);
                setNotifications(prev => [...prev, message]);
            });

            socket.on("connect_error", (err) => {
                if (err.message === "invalid userId") {
                    console.log("Your are not logged in")
                }
            });

            return () => {
                socket.off("session");
                socket.off("notifications");
                socket.off("apply job");
                socket.off("read");
                socket.off("connect_error");
            }
        }

    }, [user, sessionId]);

    const handleReadMessages = () => {
        setUnreadMessages(0);
        setNotifications(prev => prev.map((notification) => ({ ...notification, isRead: true })));
    };

    if (client) {
        client.on(event => {
            if (event.unread_channels !== undefined) {
                setUnreadStreamMessages(event.unread_channels);
            }
        })
    }

    if (client) {
        return (
            <RootStyle>
                <Chat client={client}>
                    <Header
                        user={user}
                        notifications={notifications}
                        handleRead={handleReadMessages}
                        unreadMessages={unreadMessages}
                        unreadStreamMessages={unreadStreamMessages}
                    />
                    <Outlet />
                    <Footer />
                </Chat>
            </RootStyle>
        )
    }

    return (
        <RootStyle>
            <Header 
                user={user}
                notifications={notifications}
                handleRead={handleReadMessages}
                unreadMessages={unreadMessages}
            />
            <Outlet />
            <Footer />
        </RootStyle>
    );
}