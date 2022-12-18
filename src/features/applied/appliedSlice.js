import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";
import appliedApi from "../../services/appliedApi";

const initialState = {
    checkApplyStatus: ACTION_STATUS.IDLE,
    resultApply: -1,
    createApplyStatus: ACTION_STATUS.IDLE,
    getMyAppliesStatus: ACTION_STATUS.IDLE,
    myApplies: [],
    myApplyIds: [],
    totalMAPage: 0,
    totalMAItem: 0,
}

export const checkApply = createAsyncThunk(
    "applied/check",
    async (jobId) => {
        return await appliedApi.checkApply(jobId)
    }
)

export const addApply = createAsyncThunk(
    'applied/add',
    async (data) => {
        return await appliedApi.createApply(data);
    }
);

export const getMyApplies = createAsyncThunk(
    'applied/my',
    async (page) => {
        return await appliedApi.getMyApplies(page);
    }
)

const appliedSlice = createSlice({
    name: "applied",
    initialState,
    reducers: {
        refresh: (state) => {
            state.createApplyStatus = ACTION_STATUS.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder
            
            // check apply

            .addCase(checkApply.pending, (state)=>{
                state.checkApplyStatus = ACTION_STATUS.LOADING
            })
            .addCase(checkApply.fulfilled, (state, action) => {
                state.checkApplyStatus = ACTION_STATUS.SUCCESSED
                state.resultApply = action.payload.result
            })
            .addCase(checkApply.rejected, (state) => {
                state.checkApplyStatus = ACTION_STATUS.FAILED
            })

            // add

            .addCase(addApply.pending, (state)=>{
                state.createApplyStatus = ACTION_STATUS.LOADING
            })
            .addCase(addApply.fulfilled, (state) => {
                state.createApplyStatus = ACTION_STATUS.SUCCESSED
            })
            .addCase(addApply.rejected, (state) => {
                state.createApplyStatus = ACTION_STATUS.FAILED
            })

            // my applies

            .addCase(getMyApplies.pending, (state)=>{
                state.getMyAppliesStatus = ACTION_STATUS.LOADING
            })
            .addCase(getMyApplies.fulfilled, (state, action) => {
                state.getMyAppliesStatus = ACTION_STATUS.SUCCESSED;
                state.myApplies = action.payload.applies;
                state.totalMAItem = action.payload.totalItem;
                state.totalMAPage = action.payload.totalPage;
                state.myApplyIds = action.payload.applies.map((a) => a.job._id);
            })
            .addCase(getMyApplies.rejected, (state) => {
                state.getMyAppliesStatus = ACTION_STATUS.FAILED
            })
    }
})

const { reducer} = appliedSlice;

export default reducer