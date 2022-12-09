import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import {
    Home,
    CreateJob,
    JobListing,
    JobDetail,
    Profile,
    NotFound,
    FreelancerList,
    EmployerList,
    Pricing,
    SuccessPayment,
    Messaging,
    JobManagement,
    ApplyManagement,
    FreelancerDetail,
    EmployerDetail
} from './pages';

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
                { path: 'job', element: <JobDetail />},
                { path: 'employer/:id', element: <EmployerDetail /> },
                { path: 'jobs', element: <JobListing /> },
                { path: 'freelancer/:id', element: <FreelancerDetail /> },
                { path: 'job-detail/:id', element: <JobDetail /> },
                { path: 'freelancers', element: <FreelancerList />},
                { path: 'employers', element: <EmployerList />},
                { path: 'pricing', element: <Pricing /> },
                { path: 'checkout', element: <SuccessPayment />},
                { path: 'messaging', element: <Messaging />},
                { path: 'manage-jobs', element: <JobManagement />},
                { path: 'my-applies', element: <ApplyManagement />},
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
