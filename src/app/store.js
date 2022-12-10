import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profiles/profileSlice';
import skillReducer from '../features/skills/skillSlice';
import categoryReducer from '../features/categories/categorySlice';
import jobReducer from '../features/jobs/jobSlice';
import freelancerReducer from '../features/freelancers/freelancerSlice';
import searchReducer from '../features/search/searchSlice';
import pricingReducer from '../features/pricing/pricingSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import userReducer from '../features/userDetail/userSlice'
import appliedReducer from '../features/applied/appliedSlice';
import commentReducer from '../features/comment/commentSlice';
import employerReducer from '../features/employers/employerSlice';
import transactionReducer from '../features/transactions/transactionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        skills: skillReducer,
        categories: categoryReducer,
        jobs: jobReducer,
        freelancers: freelancerReducer,
        search: searchReducer,
        pricings: pricingReducer,
        checkout: checkoutReducer,
        user: userReducer,
        applied: appliedReducer,
        comments: commentReducer,
        employers: employerReducer,
        transactions: transactionReducer,
    },
});
