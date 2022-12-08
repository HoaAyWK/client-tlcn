import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';

import Iconify from '../../components/Iconify';

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    paddingInlineStart: theme.spacing(2)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    },
}));

const SimpleTableListToolbar = ({ filterName, onFilterName, title }) => {
    return (
        <RootStyle
            disableGutters
        > 
            <SearchStyle
                value={filterName}
                onChange={onFilterName}
                placeholder={`Search ${title}...`}
                startAdornment={
                    <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                }
            />
            <div></div>
        </RootStyle>
    );
};

SimpleTableListToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    title: PropTypes.string,
};

export default SimpleTableListToolbar;