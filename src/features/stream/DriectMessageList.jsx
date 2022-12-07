import React from 'react';

const DriectMessageList = ({ children, loading}) => {
    if(loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    Messages loading...
                </p>
            </div>
        )
    }
    
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    Direct Messages
                </p>
            </div>
            {children}
        </div>
    );
};

export default DriectMessageList;