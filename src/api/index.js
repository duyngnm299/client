import axios from 'axios';
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
} from '../redux/slice/authSlice';

const API = axios.create({
    baseURL: 'http://localhost:5000',
});

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('user_info')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(
//             localStorage.getItem('user_info').token,
//         )}`;
//     }
//     return req;
// });

// export const signIn = async (user, navigate, dispatch) => {
//     dispatch(loginStart());
//     try {
//         const res = await API.post('/auth/signin', user, {
//             withCredentials: true,
//         });
//         dispatch(loginSuccess(res.data));
//         navigate('/');
//     } catch (error) {
//         dispatch(loginFailed(error?.response?.data?.message));
//     }
// };

export const signIn = async (user) => {
    const res = await API.post('/auth/signin', user, {
        withCredentials: true,
    });
    return res;
};
// export const signInGoogle = async (accessToken, navigate, dispatch) => {
//     dispatch(loginStart());
//     try {
//         const res = await API.post('/auth/signin', {
//             googleAccessToken: accessToken,
//         });
//         dispatch(loginSuccess(res.data));
//         navigate('/');
//     } catch (error) {
//         dispatch(loginFailed(error?.response?.data?.message));
//     }
// };

export const signInGoogle = async (accessToken) => {
    const res = await API.post('/auth/signin', {
        googleAccessToken: accessToken,
        withCredentials: true,
    });
    return res;
};
export const signUp = async (user) => {
    const res = await API.post('/auth/signup', user);
    return res;
};
export const signUpGoogle = async (accessToken) => {
    const res = await API.post('/auth/signup', {
        googleAccessToken: accessToken,
    });
    return res.data;
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

export const getAllCategories = async () => {
    try {
        const res = await API.get('/category');
        return res;
    } catch (error) {
        return error;
    }
};

export const createPost = async (formData) => {
    try {
        const res = await API.post('/post', formData);
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllPost = async () => {
    try {
        const res = await API.get('/post');
        return res;
    } catch (error) {
        return error;
    }
};

export const getPostOfUser = async (id) => {
    try {
        const res = await API.get('/post', id);
        return res.data;
    } catch (error) {
        return error;
    }
};
