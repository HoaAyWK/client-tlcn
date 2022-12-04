import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Home, CreateJob } from './pages';

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
                { path: 'create-job', element: <CreateJob />}
            ]
        },
    ]);
};

export default Router;
