import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";
import { employerApi } from "../../services";

const initialState = {
    getSingleStatus: ACTION_STATUS.IDLE,
    employerSingle: null
};


export const getSingleEmployer = createAsyncThunk(
    'employers/single',
    async (id) => {
        return await employerApi.getInfo(id);
    }
);


const employerSlice = createSlice({
    name: 'employers',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            // Get single

            .addCase(getSingleEmployer.pending, (state) => {
                state.getSingleStatus = ACTION_STATUS.LOADING;
            })
            .addCase(getSingleEmployer.fulfilled, (state, action) => {
                state.getSingleStatus = ACTION_STATUS.SUCCESSED;
                state.employerSingle = action.payload.employer;
            })
            .addCase(getSingleEmployer.rejected, (state) => {
                state.getSingleStatus = ACTION_STATUS.FAILED;
            })
    }
});

const { reducer } = employerSlice;

export default reducer;
