import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Home, CreateJob, JobListing, JobDetail, Profile } from './pages';

import Layout from './layouts/Layout';

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
                { path: 'job-listing', element: <JobListing /> },
                { path: 'job-detail/:id', element: <JobDetail /> },
            ]
        },
    ]);
};

export default Router;
