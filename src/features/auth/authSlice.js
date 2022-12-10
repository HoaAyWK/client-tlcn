import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ACTION_STATUS } from "../../constants";
import { authApi } from "../../services";

const initialState = {
    user: null,
    freelancer: null,
    employer: null,
    userSkills: [],
    loginStatus: ACTION_STATUS.IDLE,
    getCurrentUserStatus: ACTION_STATUS.IDLE,
    freelancerRegisterStatus: ACTION_STATUS.IDLE,
    employerRegisterStatus: ACTION_STATUS.IDLE,
    changePasswordStatus: ACTION_STATUS.IDLE,
    confirmEmailStatus: ACTION_STATUS.IDLE,
    forgotPasswordStatus: ACTION_STATUS.IDLE,
    resetPasswordStatus: ACTION_STATUS.IDLE,
    // for stream chat
    userData: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (body, thunkApi) => {
        const res = await authApi.login(body);
        localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        localStorage.setItem('streamToken', JSON.stringify(res.streamToken)); 
        
        thunkApi.dispatch(getCurrentUser());

        return res;
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async () => {
        const res = await authApi.getCurrentUser();

        const { freelancer, employer, user } = res;

        const userData = {
            id: user.id,
            email: user.email,
            image: user.image
        };

        if (freelancer) {
            userData.name = freelancer.firstName + ' ' + freelancer.lastName;
        }

        if (employer) {
            userData.name = employer.companyName;
        }

        localStorage.setItem('userData', JSON.stringify(userData));

        return res;
    }
);

export const freelancerRegister = createAsyncThunk(
    'auth/freelancerRegister',
    async (body) => {
        const res = await authApi.freelancerRegister(body);
        console.log(res);
        return res;
    }
);

export const employerRegister = createAsyncThunk(
    'auth/employerRegister',
    async (body) => {
        return await authApi.employerRegiser(body);
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (data) => {
        return await authApi.changePassword(data);
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data) => {
        return await authApi.forgotPassword(data);
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (token, thunkApi) => {
        const res = await authApi.resetPassword(token);

        localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        localStorage.setItem('streamToken', JSON.stringify(res.streamToken));
        
        thunkApi.dispatch(getCurrentUser());

        return res;
    }
);

export const confirmEmail = createAsyncThunk(
    'auth/confirmEmail',
    async (token, thunkApi) => {
        const res = await authApi.confirmEmail(token);

        localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        localStorage.setItem('streamToken', JSON.stringify(res.streamToken))
        
        thunkApi.dispatch(getCurrentUser());

        return res;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.setItem('userData', null);
            localStorage.setItem('accessToken', null);
            localStorage.setItem('streamToken', null);
            localStorage.setItem('sessionId', null);
            state.user = null;
            state.freelancer = null;
            state.employer = null;
            state.userSkills = [];
            state.userData = null;
            state.loginStatus = ACTION_STATUS.IDLE;
            state.getCurrentUserStatus = ACTION_STATUS.IDLE;
            state.employerRegisterStatus = ACTION_STATUS.IDLE;
            state.freelancerRegisterStatus = ACTION_STATUS.IDLE;
        },
        resetConfirmEmailStatus: (state) => {
            state.confirmEmailStatus = ACTION_STATUS.IDLE;
        },
        resetResetPasswordStatus: (state) => {
            state.resetPasswordStatus = ACTION_STATUS.IDLE;
        },
    },
    extraReducers: (builder) => {
        builder

            // Login

            .addCase(login.pending, (state) => {
                state.loginStatus = ACTION_STATUS.LOADING;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(login.rejected, (state) => {
                state.loginStatus = ACTION_STATUS.FAILED;
            })

            // Get current user

            .addCase(getCurrentUser.pending, (state) => {
                state.getCurrentUserStatus = ACTION_STATUS.LOADING;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.getCurrentUserStatus = ACTION_STATUS.SUCCESSED;
                state.user = action.payload.user;
                state.userSkills = action.payload.userSkills;

                const data = {
                    id: action.payload.user.id,
                    email: action.payload.user.email,
                    image: action.payload.user.image
                };

                const { freelancer, employer } = action.payload;

                if (freelancer) {
                    state.freelancer = freelancer;
                    data.name = freelancer.firstName + ' ' + freelancer.lastName;
                }

                if (employer) {
                    state.employer = employer;
                    data.name = employer.companyName;
                }

                state.userData = data;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.getCurrentUserStatus = ACTION_STATUS.FAILED;
            })

            // Freelancer register

            .addCase(freelancerRegister.pending, (state) => {
                state.freelancerRegisterStatus = ACTION_STATUS.LOADING;
            })
            .addCase(freelancerRegister.fulfilled, (state) => {
                state.freelancerRegisterStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(freelancerRegister.rejected, (state) => {
                state.freelancerRegisterStatus = ACTION_STATUS.FAILED;
            })

            // Empoyer register

            .addCase(employerRegister.pending, (state) => {
                state.employerRegisterStatus = ACTION_STATUS.LOADING;
            })
            .addCase(employerRegister.fulfilled, (state) => {
                state.employerRegisterStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(employerRegister.rejected, (state) => {
                state.employerRegisterStatus = ACTION_STATUS.FAILED;
            })


            // Change Password

            .addCase(changePassword.pending, (state) => {
                state.changePasswordStatus = ACTION_STATUS.LOADING;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.changePasswordStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(changePassword.rejected, (state) => {
                state.changePasswordStatus = ACTION_STATUS.FAILED;
            })

            // cofirm email

            .addCase(confirmEmail.pending, (state) => {
                state.confirmEmailStatus = ACTION_STATUS.LOADING;
            })
            .addCase(confirmEmail.fulfilled, (state) => {
                state.confirmEmailStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(confirmEmail.rejected, (state) => {
                state.confirmEmailStatus = ACTION_STATUS.FAILED;
            })

            // forgot password

            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordStatus = ACTION_STATUS.LOADING;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.forgotPasswordStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.forgotPasswordStatus = ACTION_STATUS.FAILED;
            })

            // reset password

            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordStatus = ACTION_STATUS.LOADING;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.resetPasswordStatus = ACTION_STATUS.SUCCESSED;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.resetPasswordStatus = ACTION_STATUS.FAILED;
            })

    }
});

const { reducer, actions } = authSlice;
export const { logout, resetConfirmEmailStatus, resetResetPasswordStatus } = actions;

export default reducer;
