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
    dispatch(logOutStart());
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
        const res = await API.get(`/post/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const updateUser = async (id, data) => {
    try {
        const res = await API.post(`/user/update/${id}`, data, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const updateUserFormData = async (id, formData) => {
    try {
        const res = await API.post(`/user/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const updateUserSavePost = async (id, data) => {
    try {
        const res = await API.post(`user/update-save-post/${id}`, data, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
};
export const deleteSavePost = async (id, data) => {
    try {
        const res = await API.post(`user/deleted-save-post/${id}`, data, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const deletedUser = async (id) => {
    try {
        const res = await API.post(`/user/deleted/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const checkExpiredPost = async (id) => {
    try {
        const res = await API.put(`/post/check/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const sendMail = async (id) => {
    try {
        const res = await API.post(`/auth/send-mail/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const verifyEmail = async (id, otp) => {
    try {
        const res = await API.post(`/auth/verify/${id}`, otp, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const getUser = async (id) => {
    try {
        const res = await API.get(`/user/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const SearchFilterPost = async (query) => {
    console.log(query);
    try {
        const res = await API.post(`/post/search?${query}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const getPostListOfUser = async (query) => {
    try {
        const res = await API.post(`/post/list?${query}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const getConvOfUser = async (id) => {
    try {
        const res = await API.get(`/conversation/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const getMessages = async (id) => {
    try {
        const res = await API.get(`/message/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const addMessage = async (data) => {
    try {
        const res = await API.post(`/message`, data);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const updatePassword = async (id, data) => {
    try {
        const res = await API.post(`/auth/${id}`, data);
        return res.data;
    } catch (error) {
        return error;
    }
};

// export const updateSeen = async (id) => {
//     try {
//         const res = await API.post(`/message/update/${id}`);
//         return res.data;
//     } catch (error) {
//         return error;
//     }
// };

export const createConversation = async (data) => {
    try {
        const res = await API.post('/conversation', data);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const res = await API.get(`/user/email/${email}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const updatePost = async (id, data) => {
    try {
        const res = await API.post(`/post/update/${id}`, data);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const deletedPost = async (id) => {
    try {
        const res = await API.post(`/post/deleted/${id}`);
        return res.data;
    } catch (error) {
        return error;
    }
};
export const getAllPostOfUser = async (query) => {
    try {
        const res = await API.post(`/post/allPostOfUser?${query}`);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const updateExpiredPost = async (id, data) => {
    try {
        const res = await API.post(`/post/update-expired/${id}`, data);
        return res.data;
    } catch (error) {
        return error;
    }
};
