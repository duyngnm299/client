import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getAllUsers, deleteUser } from '~/redux/apiRequest';
import { loginSuccess } from '~/redux/authSlice';
import { useState } from 'react';
import { createAxios } from '~/createInstance';

function PostManagement() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users?.users.allUsers);
    // const message = useSelector((state) => state.users?.msg);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
    const [getUser, setGetUser] = useState(false);
    // console.log(user);
    // console.log(user.accessToken);

    const handleDelete = (id) => {
        deleteUser(id, currentUser?.accessToken, dispatch, axiosJWT);
        // getAllUsers(currentUser?.accessToken, dispatch, axiosJWT);
        setGetUser(!getUser);
    };

    useEffect(() => {
        if (currentUser?.accessToken) {
            getAllUsers(currentUser?.accessToken, dispatch, axiosJWT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUser]);

    return (
        <div>
            {userList?.map((item, index) => (
                <div key={index}>
                    <h4>{item.username}</h4>
                    <h4>{item.email}</h4>
                    <h4>{item.password}</h4>
                    <button onClick={() => handleDelete(item._id)}>
                        Delete
                    </button>
                </div>
            ))}
            {/* <p>{message}</p> */}
        </div>
    );
}

export default PostManagement;
