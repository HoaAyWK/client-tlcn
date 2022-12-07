import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../constants';
import { checkoutApi } from '../../services';

const initialState = {
    url: null,
    status: ACTION_STATUS.IDLE
}

export const checkout = createAsyncThunk(
    'checkout/ck',
    async (pricing) => {
        return await checkoutApi.checkout(pricing);
    }
);

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        refresh: (state) => {
            state.status = ACTION_STATUS.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(checkout.pending, (state) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.status = ACTION_STATUS.SUCCESSED;
                state.url = action.payload.url;
            })
            .addCase(checkout.rejected, (state) => {
                state.status = ACTION_STATUS.FAILED;
            })
    }
})

const { actions, reducer } = checkoutSlice;
export const { refresh } = actions;

export default reducer;

