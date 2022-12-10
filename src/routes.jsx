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
    EmployerDetail,
    ForgotPassword,
    ResetPassword
} from './pages';

import Layout from './layouts/Layout';
import ConfrimEmail from './pages/ConfrimEmail';


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
            path: '/email/confirm/:token',
            element: <ConfrimEmail />
        },
        {
            path: '/password/reset/:token',
            element: <ResetPassword />
        },
        {   path: 'forgot-password',
            element: <ForgotPassword />
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
