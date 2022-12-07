import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";
import appliedApi from "../../services/appliedApi";

const initialState = {
    checkApplyStatus: ACTION_STATUS.IDLE,
    resultApply: -1
}

export const checkApply = createAsyncThunk(
    "applied/check",
    async (jobId) => {
        return await appliedApi.checkApply(jobId)
    }
)

const appliedSlice = createSlice({
    name: "applied",
    initialState,
    // check apply
    extraReducers: (builder) => {
        builder.addCase(checkApply.pending, (state)=>{
            state.checkApplyStatus = ACTION_STATUS.LOADING
        })
        builder.addCase(checkApply.fulfilled, (state, action) => {
            state.checkApplyStatus = ACTION_STATUS.SUCCESSED
            state.resultApply = action.payload.result
        })
        builder.addCase(checkApply.rejected, (state) => {
            state.checkApplyStatus = ACTION_STATUS.FAILED
        })
    }
})

const { reducer} = appliedSlice;

export default reducer