import React from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

const ItemDivider = (props) => {
    const { header, content } = { ...props }
  return (
    <Box sx={{ width: '100%'}}>
        <Typography variant="h5">
            {header}
        </Typography>
        <Typography paragraph>
           {content}
        </Typography>
        <Typography paragraph>
            {content}
        </Typography>
    </Box>
  )
}

export default ItemDivider