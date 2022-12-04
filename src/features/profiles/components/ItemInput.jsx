import { Box, OutlinedInput, Typography } from '@mui/material'
import { InputLabel, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Masonry from '@mui/lab/Masonry';
import React from 'react'
import { Textarea } from '@mui/joy';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import FormControlLabel from '@mui/material/FormControlLabel';

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

const ItemInput = () => {
    const [currency, setCurrency] = React.useState('EUR');
    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  return (
   <Box
    component="form"
    sx={{
        '& > :not(style)': { m: 1 },
    }}
    noValidate
    autoComplete="off"
   >
   <Masonry columns={2} spacing={2}>
   <Box>
        <InputLabel>First Name</InputLabel>
        <OutlinedInput placeholder='First Name' fullWidth>
        </OutlinedInput>
   </Box>
   <Box>
        <InputLabel>Last Name</InputLabel>
        <OutlinedInput placeholder='Last Name' fullWidth>
        </OutlinedInput>
   </Box>
    <Box>
        <InputLabel>Accounting Type</InputLabel>
        <TextField
          id="outlined-select-currency"
          select
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          fullWidth
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Box>
   <Box>
        <InputLabel>Email</InputLabel>
        <OutlinedInput placeholder='Email' fullWidth>
        </OutlinedInput>
   </Box>
    </Masonry>

    <Box sx={{marginRight:2, marginBottom: 2}}>
        <Typography variant='h5'>Profile</Typography>
        <InputLabel>Introduce Yourself</InputLabel>
        <Textarea
            aria-label="empty textarea"
            placeholder="Empty"
            minRows={5}
            OutlinedInput
            fullWidth
            />
    </Box>
    <Masonry columns={2} spacing={2}>
    <Box>
        <InputLabel>Languages</InputLabel>
        <OutlinedInput placeholder='First Name' fullWidth>
        </OutlinedInput>
   </Box>
   <Box>
        <InputLabel>Location</InputLabel>
        <TextField
          id="outlined-select-currency"
          select
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          fullWidth
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Box>
    </Masonry>

    <Box sx={{marginRight:2, marginBottom: 2}}>
        <InputLabel>File</InputLabel>
        <OutlinedInput placeholder='First Name' fullWidth type='file'>
        </OutlinedInput>
   </Box>

   <Box>
        <Typography variant='h5' sx={{marginBottom: 2}}>Social Media</Typography>
        <Masonry columns={2} spacing={2}>
   <Box>
        <InputLabel>Facebook</InputLabel>
        <OutlinedInput placeholder='Facebook' fullWidth>
        </OutlinedInput>
   </Box>
   <Box>
        <InputLabel>Twitter</InputLabel>
        <OutlinedInput placeholder='Twitter' fullWidth>
        </OutlinedInput>
   </Box>
   <Box>
        <InputLabel>Linkedin</InputLabel>
        <OutlinedInput placeholder='Linkedin' fullWidth>
        </OutlinedInput>
   </Box>
   <Box>
        <InputLabel>Whatsapp</InputLabel>
        <OutlinedInput placeholder='Whatsapp' fullWidth>
        </OutlinedInput>
   </Box>
    </Masonry>
    </Box>

    <Box >
        <Typography variant='h5' sx={{marginBottom: 2}}>Change Password</Typography>
   <Box sx={{marginRight:2, marginBottom: 2}}>
        <InputLabel>Current password</InputLabel>
        <OutlinedInput placeholder='Enter Current password' fullWidth>
        </OutlinedInput>
   </Box>
        <Masonry columns={2} spacing={2}>
   <Box>
        <InputLabel>New password</InputLabel>
        <OutlinedInput placeholder='Enter New password' fullWidth>
        </OutlinedInput>
   </Box>
   <Box>
        <InputLabel>Confirm Password</InputLabel>
        <OutlinedInput placeholder='Confirm Password' fullWidth>
        </OutlinedInput>
   </Box>
    </Masonry>
    <FormControlLabel control={<Checkbox />} label="Enable Two-Step Verification via email" />
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="outlined">Update</Button>
    </Box>
   </Box>
  )
}

export default ItemInput