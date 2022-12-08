import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ACTION_STATUS } from "../../constants";
import { jobApi } from "../../services";

const initialState = {
    createJobStatus: ACTION_STATUS.IDLE,
    latestJobStatus: ACTION_STATUS.IDLE,
    jobDetailStatus: ACTION_STATUS.IDLE,
    getMyJobsStatus: ACTION_STATUS.IDLE,
    latestJobCategories: [], 
    latestJobs: [],
    myAvailableJobs: [],
    myExpiredJobs: [],
    appliedPerJobs: null,
    job: null,
    jobCategories: [],
    jobApplies: [],
};

export const jobDetail = createAsyncThunk(
    'job/detail',
    async (id) => {
        return await jobApi.getJob(id)
    }
)

export const createJob = createAsyncThunk(
    'jobs/create',
    async (data) => {
        return await jobApi.createJob(data);
    }
);

export const getLatestJobs = createAsyncThunk(
    'jobs/latestJobs',
    async () => {
        const res =  await jobApi.getJobs(5, 1);
        console.log(res);
        return res;
    }
);

export const getMyJobs = createAsyncThunk(
    'jobs/myJobs',
    async () => {
        return await jobApi.getMyJobs();
    }
);

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        refresh: (state) => {
            state.createJobStatus = ACTION_STATUS.IDLE
        }
    },
    extraReducers: (builder) => {
        builder

            // Create 

            .addCase(createJob.pending, (state) => {
                state.createJobStatus = ACTION_STATUS.LOADING;
            })
            .addCase(createJob.fulfilled, (state) => {
                state.createJobStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(createJob.rejected, (state) => {
                state.createJobStatus = ACTION_STATUS.FAILED
            })

            // Get 8

            .addCase(getLatestJobs.pending, (state) => {
                state.latestJobStatus = ACTION_STATUS.LOADING;
            })
            .addCase(getLatestJobs.fulfilled, (state, action) => {
                state.latestJobStatus = ACTION_STATUS.SUCCESSED;
                state.latestJobs = action.payload.jobs;
                state.latestJobCategories = action.payload.categories;
            })
            .addCase(getLatestJobs.rejected, (state) => {
                state.latestJobStatus = ACTION_STATUS.FAILED
            })

            // get detail job
            .addCase(jobDetail.pending, (state) => {
                state.jobDetailStatus = ACTION_STATUS.LOADING
            })
            .addCase(jobDetail.fulfilled, (state, action) => {
                state.jobDetailStatus = ACTION_STATUS.SUCCESSED
                state.job = action.payload.job;
                state.jobApplies = action.payload.applies;
                state.jobCategories = action.payload.categories;
            })
            .addCase(jobDetail.rejected, (state) => {
                state.jobDetailStatus = ACTION_STATUS.FAILED
            })

            // get my

            .addCase(getMyJobs.pending, (state) => {
                state.getMyJobsStatus = ACTION_STATUS.LOADING
            })
            .addCase(getMyJobs.fulfilled, (state, action) => {
                state.getMyJobsStatus = ACTION_STATUS.SUCCESSED
                state.myAvailableJobs = action.payload.availableJobs;
                state.myExpiredJobs = action.payload.expiredJobs;
                state.appliedPerJobs = action.payload.appliesPerJob
            })
            .addCase(getMyJobs.rejected, (state) => {
                state.getMyJobsStatus = ACTION_STATUS.FAILED
            })
    }
});

const { actions, reducer } = jobSlice;

export const { refresh } = actions;

export default reducer;
