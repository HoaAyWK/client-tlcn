import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import DescriptionItemRight from './DescriptionItemRight';

function CardCustom({subtitle="Sub Title", isApply=false}) {
    return (
        <Card
            border='1px solid #eff0f2' 
            padding='20px' 
            borderRadius='10px'
            sx={{marginBottom: '40px'}}
        >   <Typography variant='h4' padding={'25px 0 0 25px'}>{subtitle}</Typography>
            <DescriptionItemRight
                icon={"mdi:user-check-outline"}
                title="Job Title"
                titleDetail='Product Designer'
            />
            <DescriptionItemRight
                icon={"fluent:hat-graduation-12-regular"}
                title="Qualification"
                titleDetail='Bachelor Degree'
            />
            <DescriptionItemRight 
                icon={"uil:usd-circle"}
                title="Offered Salary"
                titleDetail='$35k - $45k'
            />
            <DescriptionItemRight 
                icon={"material-symbols:location-on-outline"}
                title="Location"
                titleDetail='New York'
            />
            {
                isApply && <Button sx={{
                    background: 'rgb(2, 175, 116)',
                    width: '100%',
                    borderRadius: 'initial',
                    height: '60px',
                    color:'white',
                    '&:hover': {
                        background: '#1ed874',
                        transitionDelay: '0.5s'
                    }
                }}>{'Apply Now >>>'}</Button>
            }
        </Card>
    );
}

export default CardCustom;