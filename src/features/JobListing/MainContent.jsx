import React from 'react';
import { Box, Typography, CardContent, Chip, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import ItemContent from './components/ItemContent';

function MainContent(props) {
    return (
        <section>
            <Box>
                <Typography variant='h4'>Job Description</Typography>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        As a Product Designer, you will work within a Product Delivery Team fused with UX, 
                        engineering, product and data talent. You will help the team design beautiful interfaces 
                        that solve business challenges for our clients. We work with a number of Tier 1 banks on 
                        building web-based applications for AML, KYC and Sanctions List management workflows. 
                        This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.
                    </Typography>
                </CardContent>
            </Box>
            <Box>
                <Typography variant='h4'>Responsibilities</Typography>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        As a Product Designer, you will work within a Product Delivery Team fused with UX, 
                        engineering, product and data talent. You will help the team design beautiful interfaces 
                        that solve business challenges for our clients. We work with a number of Tier 1 banks on 
                        building web-based applications for AML, KYC and Sanctions List management workflows. 
                        This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.
                    </Typography>
                </CardContent>
            </Box>
            <Box>
                <Typography variant='h4' marginBottom={'15px'}>Qualification</Typography>
                <Box>
                    <ItemContent title="Have sound knowledge of commercial activities."/>
                    <ItemContent title="Build next-generation web applications with a focus on the client side"/>
                    <ItemContent title="Work on multiple projects at once, and consistently meet draft deadlines"/>
                    <ItemContent title="have already graduated or are currently in any year of study"/>
                    <ItemContent title="Revise the work of previous designers to create a unified aesthetic for our brand materials"/>
                </Box>
            </Box>
            <Box>
                <Typography variant='h4' marginBottom={'15px'}>Skill & Experience</Typography>
                <Box>
                    <ItemContent title="Understanding of key Design Principal"/>
                    <ItemContent title='Proficiency With HTML, CSS, Bootstrap'/>
                    <ItemContent title='Wordpress: 1 year (Required)'/>
                    <ItemContent title='Experience designing and developing responsive design websites'/>
                    <ItemContent title='web designing: 1 year (Preferred)'/>
                </Box>
            </Box>
            <Stack direction="row" spacing={1}>
                <Chip label="PHP" color="success" size='small' sx={{color: 'white', fontWeight: '400'}}/>
                <Chip label="Javascript" color="success" size='small' sx={{color: 'white', fontWeight: '400'}}/>
                <Chip label="React" color="success" size='small' sx={{color: 'white', fontWeight: '400'}}/>
                <Chip label="Web Developer" color="success" size='small' sx={{color: 'white', fontWeight: '400'}}/>
            </Stack> 
        </section>
    );
}

export default MainContent;