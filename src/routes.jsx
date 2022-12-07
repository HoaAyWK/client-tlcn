import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import { Home, CreateJob, JobListing, JobDetail, Profile, NotFound, FreelancerList, EmployerList, Pricing } from './pages';

import Layout from './layouts/Layout';
import FreelancerDetail from './features/userDetail/FreelancerDetail';
import EmployerDetail from './features/userDetail/EmployerDetail';

const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: 
                <Layout />
            ,
            children: [
                { path: '/', element: <Home /> },
                { path: 'profile', element: <Profile /> },
                { path: 'create-job', element: <CreateJob />},
                { path: 'job', element: <JobDetail />},
                { path: 'employer', element: <EmployerDetail /> },
                { path: 'jobs', element: <JobListing /> },
                { path: 'freelancer', element: <FreelancerDetail /> },
                { path: 'job-detail/:id', element: <JobDetail /> },
                { path: 'freelancers', element: <FreelancerList />},
                { path: 'employers', element: <EmployerList />},
                { path: 'pricing', element: <Pricing /> }
            ]
        },
        {
            path: '/404',
            element: <NotFound />
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        }
    ]);
};

export default Router;
