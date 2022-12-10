import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";

import { transactionApi } from "../../services";

const initialState = {
    transactions: [],
    status: ACTION_STATUS.IDLE
};

export const getMyTransactions = createAsyncThunk(
    'transactions/my',
    async () => {
        return await transactionApi.getMyTransactions();
    }
);

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(getMyTransactions.pending, (state) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(getMyTransactions.fulfilled, (state, action) => {
                state.status = ACTION_STATUS.SUCCESSED;
                state.transactions = action.payload.transactions;
            })
            .addCase(getMyTransactions.rejected, (state) => {
                state.status = ACTION_STATUS.FAILED;
            })
    }
});

const { reducer } = transactionSlice;

export default reducer;

