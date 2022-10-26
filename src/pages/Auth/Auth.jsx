import React from 'react';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import Button from '~/components/Button';

import { FiLock } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('picture')}></div>
                    <div className={cx('auth')}>
                        <h4 className={cx('welcome')}>Xin chào bạn</h4>
                        <h1 className={cx('title')}>Đăng nhập để tiếp tục</h1>
                        <form className="form-login">
                            <div className={cx('input-wrapper')}>
                                <div className={cx('input-icon')}>
                                    <AiOutlineUser />
                                </div>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    placeholder="Tên tài khoản hoặc email"
                                />
                            </div>
                            <div className={cx('input-wrapper')}>
                                <div className={cx('input-icon')}>
                                    <FiLock />
                                </div>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    placeholder="Mật khẩu"
                                />
                            </div>
                            <Link to={config.routes.home}>
                                <Button primary className={cx('login-btn')}>
                                    Đăng nhập
                                </Button>
                            </Link>
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
                        <div className={cx('login-with-google')}>
                            <FcGoogle className={cx('google-icon')} />
                            <span className={cx('google-text')}>
                                Đăng nhập với Google
                            </span>
                        </div>
                        <div className={cx('register-text')}>
                            <span className={cx('nm-text')}>
                                Chưa là thành viên?
                                <span className={cx('hl-text')}> Đăng ký </span>
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
