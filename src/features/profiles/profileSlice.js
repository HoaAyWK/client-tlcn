import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import { ACTION_STATUS } from "../../constants";
import { employerApi, freelancerApi, userApi } from '../../services';
import { uploadTaskPromise } from '../../utils/uploadTaskPromise';

const initialState = {
    updateGeneralStatus: ACTION_STATUS.IDLE,
    updateFeelancerStatus: ACTION_STATUS.IDLE,
    updateEmployerStatus: ACTION_STATUS.IDLE,
};

export const updateGeneral = createAsyncThunk(
    'profile/updateGeneral',
    async (data) => {
        const { email, image, ...dataToUpdate } = data;

        if (image) {
            const filePath = `files/avatar/${uuidv4()}`;
            dataToUpdate.image = await uploadTaskPromise(filePath, image);
        }

        return await userApi.updateProfile(dataToUpdate);
    }
);


export const updateFreelancer = createAsyncThunk(
    'profile/updateFreelancer',
    async (data) => {
        return await freelancerApi.updateProfile(data);
    }
);

export const updateEmployer = createAsyncThunk(
    'profile/updateEmployer',
    async (data) => {
        return await employerApi.updateProfile(data);
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        refresh: (state) => {
            state.updateFeelancerStatus = ACTION_STATUS.IDLE;
            state.updateGeneral = ACTION_STATUS.IDLE;
            state.updateEmployerStatus = ACTION_STATUS.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder

            // General
            
            .addCase(updateGeneral.pending, (state) => {
                state.updateGeneralStatus = ACTION_STATUS.LOADING;
            })
            .addCase(updateGeneral.fulfilled, (state) => {
                state.updateGeneralStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(updateGeneral.rejected, (state) => {
                state.updateGeneralStatus = ACTION_STATUS.FAILED;
            })

            // Freelancer

            .addCase(updateFreelancer.pending, (state) => {
                state.updateFeelancerStatus = ACTION_STATUS.LOADING;
            })
            .addCase(updateFreelancer.fulfilled, (state) => {
                state.updateFeelancerStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(updateFreelancer.rejected, (state) => {
                state.updateFeelancerStatus = ACTION_STATUS.FAILED
            })

            // Employer

            .addCase(updateEmployer.pending, (state) => {
                state.updateEmployerStatus = ACTION_STATUS.LOADING;
            })
            .addCase(updateEmployer.fulfilled, (state) => {
                state.updateEmployerStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(updateEmployer.rejected, (state) => {
                state.updateEmployerStatus = ACTION_STATUS.FAILED
            })
    }
});

const { actions, reducer } = profileSlice;
export const { refresh } = actions;

export default reducer;

