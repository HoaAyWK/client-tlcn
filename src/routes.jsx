import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import { Home, CreateJob, JobListing, JobDetail, Profile, NotFound } from './pages';

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
                { path: 'jobs', element: <JobListing /> },
                { path: 'job-detail/:id', element: <JobDetail /> },
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
