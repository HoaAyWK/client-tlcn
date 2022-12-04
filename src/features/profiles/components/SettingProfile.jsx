import React from 'react'
import List from '@mui/material/List';
import ItemInput from './ItemInput';
import UploadAvatar from './UploadAvatar';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

const SettingProfile = (props) => {

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <UploadAvatar></UploadAvatar>
      <ItemInput></ItemInput>
    </List>
  )
}

export default SettingProfile