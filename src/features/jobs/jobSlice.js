import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ACTION_STATUS } from "../../constants";
import { jobApi } from "../../services";

const initialState = {
    createJobStatus: ACTION_STATUS.IDLE,
};

export const createJob = createAsyncThunk(
    'jobs/create',
    async (data) => {
        return await jobApi.createJob(data);
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
            .addCase(createJob.pending, (state) => {
                state.createJobStatus = ACTION_STATUS.LOADING;
            })
            .addCase(createJob.fulfilled, (state) => {
                state.createJobStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(createJob.rejected, (state) => {
                state.createJobStatus = ACTION_STATUS.FAILED
            })
    }
});

const { actions, reducer } = jobSlice;

export const { refresh } = actions;

export default reducer;
