// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { register } from '../api';

const initialState = {
    loading: false,
    res: null,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart(state) {
            state.loading = true;
            state.error = null;
        },
        regsiterSuccess(state, action) {
            state.loading = false;
            state.res = action.payload;
        },
        registerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { registerStart, regsiterSuccess, registerFailure } = registerSlice.actions;

export const regsiter = (data) => async (dispatch) => {
    try {
        dispatch(registerStart());
        const res = await register(data);
        alert(res.message)
        dispatch(regsiterSuccess(res.message));
    } catch (error) {
        alert(error.message)
        dispatch(registerFailure(error.message));
    }
};


export default registerSlice.reducer;