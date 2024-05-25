// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './auth/loginSlice';
import registerReducer from './auth/registerSlice';
import newpropertyReducer from './property/newpropertySlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        regsiter: registerReducer,
        addproperty: newpropertyReducer
    }
});

export default store;