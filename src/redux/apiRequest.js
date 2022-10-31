import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
} from './userSlice';
const axios = require('axios');

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:5000/auth/login', user, {
            withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed(error.response.data));
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart);
    try {
        await axios.post('http://localhost:5000/auth/register', user);
        dispatch(registerSuccess);
        navigate('/dang-nhap');
    } catch (error) {
        dispatch(registerFailed);
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart);
    try {
        const res = await axiosJWT.get('http://localhost:5000/user/', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
};

export const deleteUser = async (id, accessToken, dispatch, axiosJWT) => {
    dispatch(deleteUserStart);
    try {
        const res = await axiosJWT.delete(`http://localhost:5000/user/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFailed(error.response));
    }
};

export const logOut = async (dispatch, id, navigate, token, axiosJWT) => {
    dispatch(logOutStart);
    try {
        await axiosJWT.post('http://localhost:5000/auth/logout', id, {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        dispatch(logOutSuccess());
        navigate('/dang-nhap');
    } catch (error) {
        dispatch(logOutFailed());
    }
};
