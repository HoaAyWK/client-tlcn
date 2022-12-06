import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profiles/profileSlice';
import skillReducer from '../features/skills/skillSlice';
import categoryReducer from '../features/categories/categorySlice';
import jobReducer from '../features/jobs/jobSlice';
import freelancerReducer from '../features/freelancers/freelancerSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        skills: skillReducer,
        categories: categoryReducer,
        jobs: jobReducer,
        freelancers: freelancerReducer,
        search: searchReducer
    },
});
