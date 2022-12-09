import { createAsyncThunk, createSelector, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";
import { searchApi } from "../../services";

const initialState = {
    jobs: [],
    totalJobPage: 0,
    totalJobItem: 0,
    searchJobstatus: ACTION_STATUS.IDLE,
    freelancers: [],
    totalFreelancerPage: 0,
    totalFreelancerItem: 0,
    searchFreelancerStatus: ACTION_STATUS.IDLE,
    employers: [],
    searchEmployerStatus: ACTION_STATUS.IDLE,
    totalEmployerPage: 0,
    totalEmployerItem: 0,
};

export const searchJobs = createAsyncThunk(
    'search/jobs',
    async ({ keyword, page, categories }) => {
        const res =  await searchApi.searchJobs(keyword, page, categories);
        return res;
    }
);

export const searchFreelancers = createAsyncThunk(
    'search/freelancers',
    async ({ keyword, page }) => {
        return await searchApi.searchFreelancers(keyword, page);
    }
);


export const searchEmployers = createAsyncThunk(
    'search/employers',
    async ({ keyword, page }) => {
        return await searchApi.searchEmployers(keyword, page);
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        refresh: (state) => {
            state.status = ACTION_STATUS.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder


            // Seach JObs

            .addCase(searchJobs.pending, (state) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(searchJobs.fulfilled, (state, action) => {
                state.jobs = action.payload.data;
                state.totalJobPage = action.payload.totalPage;
                state.totalJobItem = action.payload.totalItem;
                state.searchJobstatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(searchJobs.rejected, (state) => {
                state.status = ACTION_STATUS.FAILED;
            })


            // Search Freelancers

            .addCase(searchFreelancers.pending, (state) => {
                state.searchFreelancerStatus = ACTION_STATUS.LOADING
            })
            .addCase(searchFreelancers.fulfilled, (state, action) => {
                state.searchFreelancerStatus = ACTION_STATUS.SUCCESSED;
                state.freelancers = action.payload.data;
                state.totalFreelancerItem = action.payload.totalItem;
                state.totalFreelancerPage = action.payload.totalPage;
            })
            .addCase(searchFreelancers.rejected, (state) => {
                state.searchFreelancerStatus = ACTION_STATUS.FAILED;
            })


            // Search Employers

            .addCase(searchEmployers.pending, (state) => {
                state.searchEmployerStatus = ACTION_STATUS.LOADING;
            })
            .addCase(searchEmployers.fulfilled, (state, action) => {
                state.searchEmployerStatus = ACTION_STATUS.SUCCESSED;
                state.employers = action.payload.data;
                state.totalEmployerItem = action.payload.totalItem;
                state.totalEmployerPage = action.payload.totalEmployerPage;
            })
            .addCase(searchEmployers.rejected, (state) => {
                state.searchEmployerStatus = ACTION_STATUS.FAILED;
            })
    }
});

const { actions, reducer } = searchSlice;

export const { refresh } = actions;

export default reducer;
