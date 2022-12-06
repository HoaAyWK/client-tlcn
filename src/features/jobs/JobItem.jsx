import React from 'react';
import { styled } from '@mui/material/styles';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Box,
    Typography,
    Stack,
    CardActionArea
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Iconify, Label } from '../../components';
import { fDate } from '../../utils/formatTime'

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: '#fff'
}));

const CardMediaStyle = styled(CardMedia)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: 100
}));

const CardStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows[0],
    cursor: 'pointer',
    backgroundColor: 'inherit',
    marginInlineStart: 2
}));

const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
    paddingBlock: 5,
    width: '100%',
    minHeight: 100,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius
}));

const ItemButton = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[500_24],
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius
}));

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    border: `0.5px solid ${theme.palette.grey[500_48]}`,
    transition: 'all .5s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        border: `0.5px solid ${theme.palette.success.main}`,
    }
}))
 
const JobItem = ({ job, categories }) => {
    
    return (
        <Wrapper>
            <BoxStyle>
                <RouterLink to='/#'>
                    <CardStyle>
                        <CardMediaStyle
                            component='img'
                            height={80}
                            image={job?.employer?.user?.image ? job?.employer?.user?.image : '/static/images/bg_01.jpg'}
                            alt={job?.name}
                        />
                    </CardStyle>
                </RouterLink>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Stack spacing={0} sx={{ marginInlineStart: 3 }}>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                            {job?.name.length > 160 ? `${job?.name.slice(0, 160)}...` : job?.name}
                        </Typography>
                        <Typography
                            component={RouterLink}
                            to={`/employers/${job?.employer?.id}`}
                            variant='body2'
                            color='text.secondary'
                            sx={{ textDecoration: 'none', display: 'block' }}
                        
                        >
                            {job?.employer?.companyName}
                        </Typography>
                        {categories?.length > 0 && (
                            <Box sx={{ marginBlockStart: 1 }}>
                                <Stack spacing={1} direction='row'>
                                    {categories.map((category) => (
                                        <Label variant='ghost' color='primary' key={category.id}>
                                            {category.name}
                                        </Label>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                    <Box sx={{ minWidth: '60px' }}>
                        <Stack spacing={0} direction='row'>
                            <Typography variant='h6' sx={{ color: '#00B074' }}>
                                $
                            </Typography>
                            <Typography variant='h6'>
                                {`${job?.price}`}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </BoxStyle>
            <ItemButton 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingInline: 2,
                    paddingBlock: 1
                }}
            >
                <Stack spacing={1} direction='row'>
                    <Iconify icon='uiw:date' width={20} height={20} />
                    <Typography variant='body2' color='text.secondary'>
                        Start
                    </Typography>
                    <Typography variant='body2'>
                        {fDate(job?.startDate)}
                    </Typography>
                </Stack>
                <Stack spacing={1} direction='row'>
                    <Iconify icon='uiw:date' width={20} height={20} />
                    <Typography variant='body2' color='text.secondary'>
                        End
                    </Typography>
                    <Typography variant='body2'>
                        {fDate(job?.expireDate)}
                    </Typography>
                </Stack>
                <ButtonStyle color='success' variant='contained'>
                    Apply
                </ButtonStyle>
            </ItemButton>
        </Wrapper>
    );
}

export default JobItem;
