import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { ACTION_STATUS } from "../../constants";
import { categoryApi } from "../../services";

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
    status: ACTION_STATUS.IDLE,
    countPerCates: null
});

export const getCategories = createAsyncThunk(
    'categories/getAll',
    async () => {
        return await categoryApi.getCategories();
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = ACTION_STATUS.SUCCESSED;
                categoriesAdapter.setAll(state, action.payload.categories);
                state.countPerCates = action.payload.jobsPerCategory;
            })
            .addCase(getCategories.rejected, (state) => {
                state.status = ACTION_STATUS.FAILED;
            })
    }
});

export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
} = categoriesAdapter.getSelectors((state) => state.categories);

const { reducer } = categorySlice;

export default reducer;
