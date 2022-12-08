import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ChannelListContainer, ChannelContainer} from '../features/stream';

import 'stream-chat-react/dist/css/v2/index.css';
import './chat-layout.css';
import { useNavigate } from 'react-router-dom';

const Messaging = () => {
    const  { user }  = useSelector(state => state.auth);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const filters = { type: 'messaging', members: { $in: [user?.id] } };
    const sort = { last_message_at: -1 };

    if (!user) {
        navigate('/404', { replace: true });
    }

    return (
        <div className='app__wrapper'>
            <ChannelListContainer
                filters={filters}
                sort={sort}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
            />
            <ChannelContainer
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
            />
        </div>
    )
};

export default Messaging;
