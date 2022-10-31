import React from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import { FiLock } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
const cx = classNames.bind(styles);

function Login() {
    const handleLoginWithGoogle = () => {
        window.open('http://localhost:5000/auth/google', '_self');
    };
    const err = useSelector((state) => state.auth.login.error);
    if (err) {
        console.log(err);
    }

    // Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('picture')}></div>

                    <div className={cx('auth')}>
                        <h4 className={cx('welcome')}>Xin chào bạn</h4>
                        <h1 className={cx('title')}>Đăng nhập để tiếp tục</h1>
                        <form className="form-login" onSubmit={handleLogin}>
                            <div className={cx('input-wrapper')}>
                                <div className={cx('input-icon')}>
                                    <AiOutlineUser />
                                </div>
                                <input
                                    value={username}
                                    className={cx('input')}
                                    type="text"
                                    placeholder="Tên tài khoản hoặc email"
                                    onChange={(e) => {
                                        handleUsernameChange(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('input-wrapper')}>
                                <div className={cx('input-icon')}>
                                    <FiLock />
                                </div>
                                <input
                                    value={password}
                                    className={cx('input')}
                                    type="password"
                                    placeholder="Mật khẩu"
                                    onChange={(e) => {
                                        handlePasswordChange(e.target.value);
                                    }}
                                />
                            </div>
                            {/* <Link to={config.routes.home}>
                                    
                                </Link> */}
                            <Button
                                type="submit"
                                primary
                                className={cx('login-btn')}
                            >
                                Đăng nhập
                            </Button>
                        </form>
                        <div className={cx('remember-forgot')}>
                            <div className={cx('remember')}>
                                <input
                                    className={cx('checkbox')}
                                    type="checkbox"
                                    name="rememberAccount"
                                    id="rememberAccount"
                                />
                                <span className={cx('remember-text')}>
                                    Nhớ tài khoản
                                </span>
                            </div>
                            <div className={cx('forgot')}>
                                <span className={cx('forgot-text')}>
                                    Quên mật khẩu?
                                </span>
                            </div>
                        </div>
                        <div className={cx('or')}>
                            <div className={cx('line')}></div>
                            <div className={cx('or-text')}>
                                <div className={cx('text')}>Hoặc</div>
                            </div>
                        </div>
                        <div
                            className={cx('login-with-google')}
                            onClick={handleLoginWithGoogle}
                        >
                            <FcGoogle className={cx('google-icon')} />
                            <span className={cx('google-text')}>
                                Đăng nhập với Google
                            </span>
                        </div>
                        <div className={cx('register-text')}>
                            <span className={cx('nm-text')}>
                                Chưa là thành viên?
                                <Link to={config.routes.register}>
                                    <span className={cx('hl-text')}>
                                        {' '}
                                        Đăng ký{' '}
                                    </span>
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

export default Login;
