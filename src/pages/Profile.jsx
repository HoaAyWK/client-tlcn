import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';

import FreelancerProfile from '../features/profiles/FreelancerProfile';
import EmployerProfile from '../features/profiles/EmployerProfile';
import { ROLES } from '../constants';
import { Page, Loading } from '../components';

const Profile = () => {
    const { user } = useSelector(state => state.auth);

    if (user === null) {
        return <Loading />
    }

    return (
        <Page title='My Profile'>
            <Container maxWidth='lg'>
                {user?.role === ROLES.FREELANCER ? (
                    <FreelancerProfile />
                ) : (
                    <EmployerProfile />
                )}
            </Container>
        </Page>
    )
};

export default Profile;
