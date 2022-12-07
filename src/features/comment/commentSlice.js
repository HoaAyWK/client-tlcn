import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ACTION_STATUS } from "../../constants";
import { jobApi } from "../../services";

const initialState = {
    getCommentsStatus: ACTION_STATUS.IDLE,
    isPostedComments: []
};


const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        refresh: (state) => {
            state.createJobStatus = ACTION_STATUS.IDLE
        }
    },
    extraReducers: (builder) => {
        
    }
});

const { actions, reducer } = jobSlice;

export const { refresh } = actions;

export default reducer;
