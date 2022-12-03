import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Home, JobListing } from './pages';

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
                { path: 'joblisting', element: <JobListing /> },
            ]
        },
    ]);
};

export default Router;
