// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { newProperty } from '../api';

const initialState = {
    loading: false,
    res: null,
    error: null,
};

const newpropertySlice = createSlice({
    name: 'newproperty',
    initialState,
    reducers: {
        propertyAddStart(state) {
            state.loading = true;
            state.error = null;
        },
        propertyAddSuccess(state, action) {
            state.loading = false;
            state.res = action.payload;
        },
        propertyAddFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { propertyAddStart, propertyAddSuccess, propertyAddFailure } = newpropertySlice.actions;

export const addproperty = (data) => async (dispatch) => {
    try {
        dispatch(propertyAddStart());
        const res = await newProperty(data);
        alert(res.message)
        dispatch(propertyAddSuccess(res));
    } catch (error) {
        alert(error.message)
        dispatch(propertyAddFailure(error.message));
    }
};


export default newpropertySlice.reducer;