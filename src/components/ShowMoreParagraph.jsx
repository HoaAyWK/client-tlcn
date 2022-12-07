import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Typography } from '@mui/material';

import { useEffect } from 'react';
import ClickableTypography from './ClickableTypography';

const CardStyle = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.grey[500_12],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0]
}));

const ShowMoreParagraph = ({ text }) => {
    const [showMore, setShowMore] = useState(false);
    const [showMoreHidden, setShowMoreHidden] = useState(false);
    const [lineChars, setLineChars] = useState(text?.length);
    const ref = useRef(null);

    const handleResize = () => {
        const chars = Math.ceil((ref.current ? ref.current.offsetWidth : 0 ) / 8);
        setLineChars(chars * 5);
        if (text?.length > chars * 5) {
            if (!showMore) {
                setShowMore(true);
            }
        } else {
            setShowMoreHidden(true);
        }
    };

    useEffect(() => {
        const chars = Math.ceil((ref.current ? ref.current.offsetWidth : 0 ) / 8);
        setLineChars(chars * 5);
        if (text?.length > chars * 5) {
            setShowMore(true);
        } else {
            setShowMoreHidden(true);
        }
    }, [ref.current, text]);

    useEffect(() => {
        window.addEventListener('resize', handleResize, false);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShowMoreClick = () => {
        setShowMore(false);
    };

    const handleShowLessClick = () => {
        setShowMore(true);
    };

    return (
        <CardStyle>
            <CardContent >
                <Typography variant='body1' ref={ref}>
                    {showMore ? (
                        `${text.slice(0, lineChars)}...`
                    ) : (
                        text
                    )}
                </Typography>
                {showMoreHidden ? (<></>) : (
                    <Box>
                        {showMore ? (
                            <ClickableTypography handleClick={handleShowMoreClick}>
                                Show more
                            </ClickableTypography>
                        ) : (
                            <ClickableTypography handleClick={handleShowLessClick}>
                                Show less
                            </ClickableTypography>
                        )}
                    </Box>
                )}
            </CardContent>
        </CardStyle>
    );
};

export default ShowMoreParagraph;