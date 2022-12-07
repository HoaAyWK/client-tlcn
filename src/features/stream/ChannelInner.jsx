import React from 'react';
import { MessageList, MessageInput, Thread, Window, ChannelHeader } from 'stream-chat-react';

const ChannelInner = () => {
    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
            </Window>
            <Thread />
      </div>
    );
};

export default ChannelInner;