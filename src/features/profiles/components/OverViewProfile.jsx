import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ItemDivider from './ItemDivider';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

const header = ['About', 'Experiences', 'Skills', 'Spoken languages']

const OverViewProfile = (props) => {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
        {header.map(item =>  <ListItem button>
          <ItemDivider header={item}></ItemDivider>
          </ListItem> )}  
    </List>
  )
}

export default OverViewProfile