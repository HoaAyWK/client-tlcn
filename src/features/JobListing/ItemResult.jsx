import { 
    Box, 
    Card, 
    CardActionArea, 
    CardActions,
    Grid,
    Typography,
    Button} from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import LogoCompany from './components/LogoCompany';

function ItemResult(props) {
    const { id, title, des, location, timed } = props.item
    return (
        <Card key={id} sx={{ 
            maxWidth: '100%', 
            border: '1px solid #f3f3f3', 
            margin: '45px 0', 
            '&:hover': {
                border: '1px solid #02af74'
            }}}
        >
            <CardActionArea sx={{
                height: '130px', 
                padding: '20px', 
                display: 'flex'
            }}>
                <LogoCompany/>
                <Grid container flex={1} alignItems="center" spacing={3} marginLeft={'20px'}>
                    <Grid item xs={3}> 
                        <Typography 
                            style={{
                                fontFamily: 'system-ui',
                                color: 'rgb(50 50 50 / 87%)',
                                fontSize: '25px'
                            }} 
                            variant='p'
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant='h6'
                            style={{
                                fontFamily: 'system-ui',
                                fontWeight: '200'
                            }} 
                        >
                            {des}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Icon fontSize='20px' icon="material-symbols:location-on" color="#02af74" inline={true} />
                        <span style={{fontSize: '20px', marginLeft: '10px', color: '#74788d'}}>{location}</span>
                    </Grid>
                    <Grid item xs={3}>
                        <Icon fontSize='25px' icon="ic:round-access-time" color="#02af74" inline={true} />
                        <span style={{fontSize: '20px', marginLeft: '10px', color: '#74788d'}}>{timed}</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span style={{fontSize: '20px', marginLeft: '10px', color: '#74788d'}}> Things</span>
                    </Grid>
                </Grid>
            </CardActionArea>
            <CardActions sx={{
                display: 'flex', 
                height: '40px',
                justifyContent: 'space-between', 
                alignItem: 'center', 
                backgroundColor: 'rgb(246, 246, 246)'}}
            >
                <Typography variant="h6" component="div">
                    Experience :2 - 3 years
                </Typography>
                <Button size="small" color="primary">
                    {'Apply Now >>>'}
                </Button>
            </CardActions>
        </Card>
    );
}

export default ItemResult;