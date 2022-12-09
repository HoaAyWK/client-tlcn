import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ACTION_STATUS } from "../../constants";
import { commentApi } from "../../services";

const initialState = {
    getCommentsStatus: ACTION_STATUS.IDLE,
    isPostedComments: [],
    receiverComments: [],
    getReceiverCommentsStatus: ACTION_STATUS.IDLE,
    addCommentStatus: ACTION_STATUS.IDLE,
};

export const getReceiverComments = createAsyncThunk(
    'comments/receiver',
    async (id) => {
        return await commentApi.getCommentsByReceiver(id);
    }
);

export const addComment = createAsyncThunk(
    'comments/add',
    async (data) => {
        return await commentApi.addComment(data);
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            // get comments by receiver

            .addCase(getReceiverComments.pending, (state) => {
                state.getReceiverCommentsStatus = ACTION_STATUS.LOADING;
            })
            .addCase(getReceiverComments.fulfilled, (state, action) => {
                state.getReceiverCommentsStatus = ACTION_STATUS.SUCCESSED;
                state.receiverComments = action.payload.comments;
            })
            .addCase(getReceiverComments.rejected, (state) => {
                state.getReceiverCommentsStatus = ACTION_STATUS.FAILED;
            })

            /// add comment

            .addCase(addComment.pending, (state) => {
                state.addCommentStatus = ACTION_STATUS.LOADING;
            })
            .addCase(addComment.fulfilled, (state) => {
                state.addCommentStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(addComment.rejected, (state) => {
                state.addCommentStatus = ACTION_STATUS.FAILED;
            })
    }
});

const { actions, reducer } = commentSlice;

export default reducer;
