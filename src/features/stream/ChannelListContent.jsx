import React from 'react';
import { ChannelList } from 'stream-chat-react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import DirectMessagePreview from './DirectMessagePreview';
import DirectMessageList from './DriectMessageList';

const GoBackArea = styled.div`
    display: flex;
    align-items: center;
    margin-inline: 8px;
    margin-block-start: 4px;
    border-radius: 12px;
    &:hover {
        background-color: rgba(99, 115, 129, 0.08);
        cursor: pointer;
    }
`

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    font-size: 1.5rem;
    padding: 8px;
    border-radius: 50%;
    overflow: visible;
    color: rgb(99, 115, 129);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 40px;
    height: 40px;
`;

const IconWrapper = styled.span`
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    flex-shrink: 0;
`;

const ChannelListContent = ({ isCreating, setIsCreating, setIsEditing, filters, sort }) => {
    const navigate = useNavigate();

    const handleClickBackToHome = () => {
        navigate('/');
    };

    return (
        <>
            <div className="channel-list__list__wrapper">
                <GoBackArea onClick={handleClickBackToHome}>
                    <Button>
                        <IconWrapper>
                            <Icon icon='majesticons:door-exit-line' style={{ color: '#078dee;', rotate: '180deg' }} />
                        </IconWrapper>
                    </Button>
                    <p>Back to home</p>
                </GoBackArea>
                <ChannelList 
                    filters={filters}
                    sort={sort}
                    List={(listProps) => (
                        <DirectMessageList 
                            {...listProps}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <DirectMessagePreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                        />
                    )}
                />
            </div>
        </>
    )
}

export default ChannelListContent;