import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { ACTION_STATUS } from "../../constants";
import { skillApi } from '../../services';

const skillsAdapter = createEntityAdapter();

const initialState = skillsAdapter.getInitialState({
    status: ACTION_STATUS.IDLE
});

export const getSkills = createAsyncThunk(
    'skills/getAll',
    async () => {
        return await skillApi.getSkills();
    }
);

const skillSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSkills.pending, (state) => {
                state.status = ACTION_STATUS.LOADING;
            })
            .addCase(getSkills.fulfilled, (state, action) => {
                skillsAdapter.setAll(state, action.payload.skills);
                state.status = ACTION_STATUS.SUCCEEDED;
            })
            .addCase(getSkills.rejected, (state) => {
                state.status = ACTION_STATUS.FAILED;
            })
    }
});

export const {
    selectAll: selectAllSkills,
    selectById: selectSkillById,
    selectIds: selectSkillIds
} = skillsAdapter.getSelectors((state) => state.skills);

const { reducer } = skillSlice;

export default reducer;

