import { createAsyncThunk, createSelector, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";
import { searchApi } from "../../services";

const initialState = {
    jobs: [],
    totalPage: 0,
    totalItem: 0,
    status: ACTION_STATUS.IDLE,
    error: null
};

export const searchJobs = createAsyncThunk(
    'search/jobs',
    async ({ keyword, page }) => {
        const res =  await searchApi.searchJobs(keyword, page);
        return res;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        refresh: (state) => {
            state.status = ACTION_STATUS.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(searchJobs.pending, (state) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(searchJobs.fulfilled, (state, action) => {
                state.jobs = action.payload.data;
                state.totalPage = action.payload.totalPage;
                state.totalItem = action.payload.totalItem;
                state.status = ACTION_STATUS.SUCCESSED;
            })
            .addCase(searchJobs.rejected, (state, action) => {
                state.status = ACTION_STATUS.FAILED;
                state.error = action.error;
            })
    }
});

const { actions, reducer } = searchSlice;

export const { refresh } = actions;

export default reducer;
