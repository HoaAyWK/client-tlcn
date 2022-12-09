import React from 'react';
import { Box, Typography, Stack, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { Label } from '../../components';
import { useNavigate } from 'react-router-dom';

const CardStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    boxShadow: theme.shadows[0],
    cursor: 'pointer',
    backgroundColor: 'inherit',
    transition: 'all .5s ease',
    '&:hover': {
        transform: 'translateY(-8px)'
    }
}));

const CardMediaStyle = styled(CardMedia)(({ theme }) => ({
    width: 80,
    borderRadius: theme.shape.borderRadius
}));

const BoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const CategoryItem = ({ category, countPerCates }) => {
    const count = countPerCates?.[category.id] ? countPerCates[category.id] : 0;
    const navigate = useNavigate();

    return (
        <CardStyle onClick={() => navigate(`/jobs?categories=${category.id}`)}>
            <BoxStyle>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMediaStyle
                            component='img'
                            height={80}
                            image={category.image ? category.image : '/static/images/bg_01.jpg'}
                            alt={category.name}
                        />
                    </Box>
                    <Typography textAlign='center' variant='h6' color='text.primary' sx={{ maxWidth: 120 }}>
                        {category.name}
                    </Typography>
                    <BoxStyle>
                        <Label variant='ghost' color='success'>
                            {count > 1 ? `${count} Jobs` : `${count} Job`}
                        </Label>
                    </BoxStyle>
                </Stack>
            </BoxStyle>
        </CardStyle>
    )
}

export default CategoryItem