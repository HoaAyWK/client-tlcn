import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";
import pricingApi from "../../services/pricingApi";

const pricingsAdapter = createEntityAdapter();

const initialState = pricingsAdapter.getInitialState({
    status: ACTION_STATUS.IDLE
});

export const getPricings = createAsyncThunk(
    'pricings/all',
    async () => {
        return await pricingApi.getPricings();
    }
);

const pricingSlice = createSlice({
    name: 'pricings',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            
            .addCase(getPricings.pending, (state) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(getPricings.fulfilled, (state, action) => {
                state.status = ACTION_STATUS.SUCCESSED;
                pricingsAdapter.setAll(state, action.payload.packages);
            })
            .addCase(getPricings.rejected, (state) => {
                state.status = ACTION_STATUS.FAILED
            });
    }
});

export const {
    selectAll: selectAllPricings,
    selectById: selectPricingById,
    selectIds: selectPricingIds
} = pricingsAdapter.getSelectors((state) => state.pricings);

const { reducer } = pricingSlice;

export default reducer;

