import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, InputBase, Button } from '@mui/material';

import { Iconify } from '../components';

const SearchArea = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    paddingBlock: 5,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    cursor: 'text'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
            width: '100%',
            '&:focus': {
                width: '100%',
            },
        },
    },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 0.4,
    paddingBlock: 8,
    fontSize: '1rem',
    color: 'white'
}));

const Search = () => {
    return (
        <SearchArea>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <SearchIconWrapper>
                        <Iconify icon='material-symbols:search' width={25} height={25} style={{ color: '#00b074' }}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Type Job Title, Keywords"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Box>
                <ButtonStyle color='success' variant='contained' sx={{ marginInlineEnd: 1 }}>SEARCH</ButtonStyle>
            </Box>
        </SearchArea>
    )
}

export default Search;