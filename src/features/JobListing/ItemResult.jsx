import React from 'react';
import { 
    Box, 
    Card, 
    CardActionArea, 
    CardActions,
    Grid,
    Typography,
    Stack,
    Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import LogoCompany from './components/LogoCompany';
import { Iconify, Label } from '../../components';
import { fDate } from '../../utils/formatTime';

function ItemResult({ item }) {
    return (
        <Card key={item?._id} sx={{ 
            maxWidth: '100%', 
            border: '1px solid #f3f3f3', 
            margin: '45px 0', 
            '&:hover': {
                border: '1px solid #02af74'
            }}}
        >
            <CardActionArea sx={{
                minHeight: '130px', 
                paddingInline: 2, 
                display: 'flex'
            }}>
                <RouterLink to={`/employers/${item?._id}`}>
                    <LogoCompany/>
                </RouterLink>
                <Grid container flex={1} alignItems="center" spacing={1}>
                    <Grid item xs={10.5}> 
                        <Stack spacing={0.5} sx={{ marginInlineStart: 2 }}>
                            <Typography 
                                style={{
                                    fontWeight: 600,
                                    color: 'rgb(50 50 50 / 87%)',
                                }} 
                                variant='body1'
                            >
                                {item?.name}
                            </Typography>
                            <Typography
                                component={RouterLink}
                                to={`/employers/${item._id}`}
                                variant='body1'
                                color='text.secondary'
                                sx={{
                                    textDecoration: 'none',
                                    marginInlineStart: 2,
                                    fontWeight: 600
                                }}
                            >
                                {item?.employer?.companyName}
                            </Typography>
                            {item?.categories && (
                                <Stack direction='row' spacing={1} sx={{ marginInlineStart: 2 }}>
                                    {item?.categories?.map((cate) => (
                                        <Label key={cate?._id} variant='contained' color='primary'>
                                            {cate?.category?.name}
                                        </Label>
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={1.5}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                width: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Iconify
                                    icon='ph:currency-circle-dollar-duotone'
                                    style={{ color: '#02af74'}}
                                    width={28}
                                    height={28}
                                />
                                <Typography variant='body1' color='#74788d' sx={{ fontWeight: '600', marginInlineStart: 0.5 }}>
                                    {item?.price}
                                </Typography>
                            </Box>
                        </Box>
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
                <Stack spacing={1} direction='row'>
                    <Iconify icon='uiw:date' width={20} height={20} />
                    <Typography variant='body2' color='text.secondary'>
                        Start
                    </Typography>
                    <Typography variant='body2'>
                        {fDate(item?.startDate)}
                    </Typography>
                </Stack>
                <Stack spacing={1} direction='row'>
                    <Iconify icon='uiw:date' width={20} height={20} />
                    <Typography variant='body2' color='text.secondary'>
                        End
                    </Typography>
                    <Typography variant='body2'>
                        {fDate(item?.expireDate)}
                    </Typography>
                </Stack>
                <Button size="small" color="primary">
                    {'Apply Now >>>'}
                </Button>
            </CardActions>
        </Card>
    );
}

export default ItemResult;