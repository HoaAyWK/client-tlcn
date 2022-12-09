import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";

import { freelancerApi } from '../../services';

const freelancersAdaper = createEntityAdapter();

const initialState = freelancersAdaper.getInitialState({
    status: ACTION_STATUS.IDLE,
    turnOnStatus: ACTION_STATUS.IDLE,
    turnOffStatus: ACTION_STATUS.IDLE,
    freelancerSkills: [],
    freelancerSingle: null,
    singleFreelancerStatus: ACTION_STATUS.IDLE,
});

export const getFreelancers = createAsyncThunk(
    'freelancers/getFreelancers',
    async () => {
        return await freelancerApi.getFreelancers();
    } 
);

export const turnOn = createAsyncThunk(
    'freelancers/turnOn',
    async () => {
        return await freelancerApi.turnOnFindJob();
    }
);

export const turnOff = createAsyncThunk(
    'freelancers/turnOff',
    async () => {
        return await freelancerApi.turnOffFindJob();
    }
);

export const getSingleFreelancer = createAsyncThunk(
    'freelancers/single',
    async (id) => {
        return await freelancerApi.getSingle(id)
    }
);


const freelancerslice = createSlice({
    name: 'freelancers',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

        // Get Freelancers

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


        // Turn on find job

        .addCase(turnOn.pending, (state) => {
            state.turnOnStatus = ACTION_STATUS.LOADING;
        })
        .addCase(turnOn.fulfilled, (state) => {
            state.turnOnStatus = ACTION_STATUS.SUCCEEDED;
        })
        .addCase(turnOn.rejected, (state) => {
            state.turnOnStatus = ACTION_STATUS.FAILED;
        })

        // Turn off find job

        .addCase(turnOff.pending, (state) => {
            state.turnOffStatus = ACTION_STATUS.LOADING;
        })
        .addCase(turnOff.fulfilled, (state) => {
            state.turnOffStatus = ACTION_STATUS.SUCCEEDED;
        })
        .addCase(turnOff.rejected, (state) => {
            state.turnOffStatus = ACTION_STATUS.FAILED;
        })


        // Get single

        .addCase(getSingleFreelancer.pending, (state) => {
            state.singleFreelancerStatus = ACTION_STATUS.LOADING;
        })
        .addCase(getSingleFreelancer.fulfilled, (state, action) => {
            state.singleFreelancerStatus = ACTION_STATUS.SUCCESSED;
            state.freelancerSingle = action.payload.freelancer;
        })
        .addCase(getSingleFreelancer.rejected, (state) => {
            state.singleFreelancerStatus = ACTION_STATUS.FAILED;
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
