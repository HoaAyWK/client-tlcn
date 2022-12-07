import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const DirectMessagePreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel }) => {
    const { channel: activeChannel, client } = useChatContext();
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.name || members[0]?.user?.id}
                    size={32}
                />
                <p>{members[0]?.user?.name || members[0]?.user?.id}</p>
            </div>
        </div>
    );
};

export default DirectMessagePreview;
