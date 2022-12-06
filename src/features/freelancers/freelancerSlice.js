import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";

import { freelancerApi } from '../../services';

const freelancersAdaper = createEntityAdapter();

const initialState = freelancersAdaper.getInitialState({
    status: ACTION_STATUS.IDLE,
    freelancerSkills: []
});

export const getFreelancers = createAsyncThunk(
    'freelancers/getFreelancers',
    async () => {
        return await freelancerApi.getFreelancers();
    } 
);


const freelancerslice = createSlice({
    name: 'freelancers',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder


        .addCase(getFreelancers.pending, (state) => {
            state.status = ACTION_STATUS.LOADING;
        })
        .addCase(getFreelancers.fulfilled, (state, action) => {
            state.status = ACTION_STATUS.SUCCEEDED;
            freelancersAdaper.setAll(state, action.payload.freelancers);
            state.freelancerSkills = action.payload.freelanceSkills;
        })
        .addCase(getFreelancers.rejected, (state) => {
            state.status = ACTION_STATUS.FAILED;
        })
    }
})

export const {
    selectAll: selectAllFreelancers,
    selectById: selectFreelancerById,
    selectIds: selectFreelancerIds
} = freelancersAdaper.getSelectors((state) => state.freelancers);

export const selectFreelancersByNum = createSelector(
    [selectAllFreelancers, (state, num) => num],
    (jobs, num) => jobs.slice(0, num)
);

const { reducer } = freelancerslice;

export default reducer;
