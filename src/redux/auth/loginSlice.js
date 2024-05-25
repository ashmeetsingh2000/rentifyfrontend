// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../api';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.authTo = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginSlice.actions;

export const login = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const user = await loginApi(credentials);
        dispatch(loginSuccess(user.data));
    } catch (error) {
        alert(error.message)
        dispatch(loginFailure(error.message));
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch(logout());
};

export default loginSlice.reducer;
