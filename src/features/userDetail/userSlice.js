import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { ACTION_STATUS } from "../../constants";
import { employerApi, freelancerApi } from "../../services";


const initialState = {
    freelancer: null,
    user: null,
    freelancerStatus: ACTION_STATUS.IDLE,
    employer: null,
    employerStatus: ACTION_STATUS.IDLE
}

export const getInfoEmployer = createAsyncThunk(
    'user/employer',
    async (id) => {
        return await employerApi.getInfo(id)
    }
)

export const getInforFreelancer = createAsyncThunk(
    "user/freelancer",
    async (id) => {
        return await freelancerApi.getInfoFreelancer(id)
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: (builder) => {
        // get info freelancer
        builder.addCase(getInforFreelancer.pending, (state) => {
            state.freelancerStatus = ACTION_STATUS.LOADING
        })
        builder.addCase(getInforFreelancer.fulfilled, (state, action) => {
            state.freelancer = action.payload.freelancer
            state.user = action.payload.user
            state.freelancerStatus = ACTION_STATUS.SUCCESSED
        })
        builder.addCase(getInforFreelancer.rejected, (state) => {
            state.freelancerStatus = ACTION_STATUS.FAILED
        })
        // get infor employer
        builder.addCase(getInfoEmployer.pending, (state) => {
            state.employerStatus = ACTION_STATUS.LOADING
        })
        builder.addCase(getInfoEmployer.fulfilled, (state, action) => {
            state.employerStatus = ACTION_STATUS.SUCCESSED
            state.employer = action.payload.employer
        })
        builder.addCase(getInfoEmployer.rejected, (state) => {
            state.employerStatus = ACTION_STATUS.FAILED
        })
    }
})

const {reducer} = userSlice
export default reducer