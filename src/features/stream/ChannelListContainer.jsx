import React from 'react';

import ChannelListContent from './ChannelListContent';


const ChannelListContainer = ({ setIsCreating, setIsEditing, filters, sort }) => {
    return (
         <>
            <div className="channel-list__container">
              <ChannelListContent
                filters={filters}
                sort={sort}
                setIsCreating={setIsCreating} 
                setIsEditing={setIsEditing} 
              />
            </div>
        </>
    );
}

export default ChannelListContainer;