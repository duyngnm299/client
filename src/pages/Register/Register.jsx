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
import { registerUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password,
        };
        registerUser(newUser, dispatch, navigate);
    };
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
                                    className={cx('input-register')}
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
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
                                    className={cx('input-register')}
                                    type="email"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div className={cx('input-register-wrapper')}>
                                <div className={cx('input-icon-register')}>
                                    <FiLock />
                                </div>
                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className={cx('input-register')}
                                    type="text"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>

                            <div className={cx('input-register-wrapper')}>
                                <div className={cx('input-icon-register')}>
                                    <VscVerified />
                                </div>
                                <input
                                    value={rePassword}
                                    onChange={(e) =>
                                        setRePassword(e.target.value)
                                    }
                                    className={cx('input-register')}
                                    type="text"
                                    placeholder="Xác nhận mật khẩu"
                                />
                            </div>

                            <Button
                                type="submit"
                                primary
                                className={cx('register-btn')}
                                onClick={() => {}}
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
                        <div className={cx('register-with-google')}>
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

export default Auth;
