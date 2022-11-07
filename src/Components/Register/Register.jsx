import React from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Button from '~/components/Button';

import { FiLock } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useState } from 'react';
import { VscVerified } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import { signIn, signUp, signUpGoogle } from '~/api';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from '~/redux/slice/authSlice';

const cx = classNames.bind(styles);
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState(false);
    const [showSuccessNotify, setShowSuccessNotify] = useState(false);
    const [showErrorNotify, setShowErrorNotify] = useState(false);

    const err = useSelector((state) => state.auth.register.error);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== rePassword && !password) {
            return;
        } else if (password === rePassword) {
            setMessage(true);

            const newUser = {
                username: username,
                email: email,
                password: password,
                confirmPassword: rePassword,
            };
            dispatch(registerStart());
            try {
                signUp(newUser)
                    .then((res) => {
                        dispatch(registerSuccess(res.data));
                        dispatch(loginStart());
                        setShowSuccessNotify(true);
                        setShowErrorNotify(false);
                        const user = {
                            username: username,
                            password: password,
                        };
                        try {
                            signIn(user)
                                .then((res) => {
                                    dispatch(loginSuccess(res.data));
                                })
                                .catch(dispatch(loginFailed));
                        } catch (error) {}
                    })
                    .catch((error) => {
                        if (
                            error.response.data === 'Username existed!' ||
                            error.response.data === 'Email existed!'
                        ) {
                            setShowErrorNotify(true);
                        }
                        setShowSuccessNotify(false);
                        dispatch(registerFailed(error.response.data));
                    });
            } catch (error) {}
        }
    };

    showSuccessNotify &&
        Swal.fire({
            title: '<h2 class="notify-title">Đăng kí thành công!</h2>',
            icon: 'success',
            html: '<p style="font-size: 1.4rem; margin: 0 0 20px 0">Vui lòng cập nhật thông tin cá nhân của bạn!</p>',
            confirmButtonText:
                '<p style="font-size: 16px; padding: 10px;">Xác nhận</p>',
            confirmButtonColor: '#a5dc86',
            allowOutsideClick: false,
            focusConfirm: false,
            width: '500px',
            padding: '30px 20px',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });
    let existed = '';
    if (err === 'Username existed!') {
        existed = 'Tài khoản';
    } else if (err === 'Email existed!') {
        existed = 'Email';
    }
    showErrorNotify &&
        Swal.fire({
            title: '<h2 class="notify-title">Đăng kí thất bại!</h2>',
            icon: 'error',
            html: `<p style="font-size: 1.4rem; margin: 0 0 20px 0">${existed} đã tồn tại!</p>`,
            confirmButtonText:
                '<p style="font-size: 16px; padding: 10px;">Xác nhận</p>',
            confirmButtonColor: '#e03c31',
            allowOutsideClick: false,
            focusConfirm: false,
            width: '500px',
            padding: '30px 20px',
        }).then((result) => {
            if (result.isConfirmed) {
                setShowErrorNotify(false);
            }
        });

    function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        console.log(accessToken);
        signUpGoogle(accessToken, navigate, dispatch);
    }
    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('picture')}></div>

                    <div className={cx('register')}>
                        <h4 className={cx('welcome')}>Xin chào bạn</h4>
                        <h1 className={cx('title')}>Đăng ký tài khoản mới</h1>
                        <form
                            className={cx('form-register')}
                            onSubmit={handleRegister}
                        >
                            <div className={cx('input-register-wrapper')}>
                                <div className={cx('input-icon-register')}>
                                    <AiOutlineUser />
                                </div>
                                <input
                                    className={cx(
                                        'input-register',
                                        err &&
                                            !username &&
                                            message &&
                                            'invalid',
                                    )}
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    pattern="[^' ']+"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            {err && message && (
                                <span className={cx('message')}>
                                    {!username ? 'Trường này là bắt buộc!' : ''}
                                </span>
                            )}
                            <div className={cx('input-register-wrapper')}>
                                <div
                                    className={cx(
                                        'input-icon-register',
                                        'email',
                                    )}
                                >
                                    <AiOutlineMail />
                                </div>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cx(
                                        'input-register',
                                        err && !email && message && 'invalid',
                                    )}
                                    type="email"
                                    placeholder="Nhập email"
                                />
                            </div>
                            {err && message && (
                                <span className={cx('message')}>
                                    {!email ? 'Trường này là bắt buộc!' : ''}
                                </span>
                            )}
                            <div className={cx('input-register-wrapper')}>
                                <div className={cx('input-icon-register')}>
                                    <FiLock />
                                </div>
                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className={cx(
                                        'input-register',
                                        err &&
                                            !password &&
                                            message &&
                                            'invalid',
                                    )}
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                            {err && message && (
                                <span className={cx('message')}>
                                    {!password
                                        ? 'Trường này là bắt buộc!'
                                        : password.length < 8
                                        ? 'Mật khẩu phải có ít nhất 8 kí tự!'
                                        : ''}
                                </span>
                            )}

                            <div className={cx('input-register-wrapper')}>
                                <div className={cx('input-icon-register')}>
                                    <VscVerified />
                                </div>
                                <input
                                    value={rePassword}
                                    onChange={(e) =>
                                        setRePassword(e.target.value)
                                    }
                                    className={cx(
                                        'input-register',
                                        err &&
                                            !rePassword &&
                                            message &&
                                            'invalid',
                                    )}
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                />
                            </div>
                            {err && message && (
                                <span className={cx('message')}>
                                    {!rePassword
                                        ? 'Trường này là bắt buộc!'
                                        : rePassword !== password
                                        ? 'Mật khẩu chưa chính xác'
                                        : ''}
                                </span>
                            )}
                            <Button
                                type="submit"
                                primary
                                className={cx('register-btn')}
                            >
                                Đăng ký
                            </Button>
                        </form>
                        <div className={cx('or-register')}>
                            <div className={cx('line')}></div>
                            <div className={cx('or-text')}>
                                <div className={cx('text')}>Hoặc</div>
                            </div>
                        </div>
                        <div
                            className={cx('register-with-google')}
                            onClick={() => login()}
                        >
                            <FcGoogle className={cx('google-icon')} />
                            <span className={cx('google-text')}>
                                Đăng nhập với Google
                            </span>
                        </div>
                        {/* <div className={cx('term-of-use')}>
                                <span className={cx('nm-text')}>
                                    Bằng việc tiếp tục, bạn đồng ý với{' '}
                                    <span className={cx('hl-text')}>
                                        Điều khoản sử dụng
                                    </span>{' '}
                                    của chúng tôi
                                </span>
                            </div> */}
                        <div className={cx('register-text')}>
                            <span className={cx('nm-text')}>
                                Bạn đã có tài khoản?{' '}
                                <Link to={config.routes.login}>
                                    <span className={cx('hl-text')}>
                                        Đăng nhập
                                    </span>{' '}
                                </Link>
                                tại đây
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
