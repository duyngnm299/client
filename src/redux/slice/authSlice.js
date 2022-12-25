import { createSlice } from '@reduxjs/toolkit';
import localStorage from 'redux-persist/es/storage';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            currentUser: null,
        },
        update: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = action.payload;
        },

        // Register
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.currentUser = action.payload;
        },
        registerFailed: (state, action) => {
            state.register.isFetching = false;
            state.register.error = action.payload;
        },
        // Logout
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.update.currentUser = null;
            state.login.error = false;
            // localStorage.removeItem('persist:root');
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        updatedStart: (state) => {
            state.update.isFetching = true;
        },
        updatedUser(state, action) {
            state.update.isFetching = false;
            state.update.currentUser = action.payload;
            state.update.error = false;
        },
    },
});
// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         current: JSON.parse(localStorage.getItem('auth')),
//     },
//     reducers: {
//         logout(state) {
//             //clear localStorage
//             localStorage.removeItem('auth');
//             state.current = null;
//         },

//         updateNotification(state, action) {
//             state.notification = action.payload;
//         },
//     },
// });

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    updatedStart,
    updatedUser,
} = authSlice.actions;
export default authSlice.reducer;
