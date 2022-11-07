import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import Button from '~/components/Button';
import styles from './Menu.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';
import { createAxios } from '~/createInstances';
import {
    faUser,
    faRightFromBracket,
    faBars,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/api/index';
import { logOutSuccess, registerFailed } from '~/redux/slice/authSlice';
const cx = classNames.bind(styles);
function MenuItem() {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const id = currentUser._id;
    const accessToken = currentUser?.accessToken;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);
    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };
    return (
        <>
            <Link to={config.routes.postmng}>
                <div className={cx('menu-item')}>
                    <div className={cx('abc')}>
                        <span className={cx('menu-icon')}>
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                        <span className={cx('menu-title')}>
                            Quản lý tin đăng
                        </span>
                    </div>
                </div>
            </Link>

            <Link to={config.routes.profile}>
                <div className={cx('menu-item')}>
                    <div className={cx('abc')}>
                        <span className={cx('menu-icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span className={cx('menu-title')}>
                            Thay đổi thông tin cá nhân
                        </span>
                    </div>
                </div>
            </Link>

            <Link to={config.routes.password}>
                <div className={cx('menu-item')}>
                    <div className={cx('abc')}>
                        <span className={cx('menu-icon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span className={cx('menu-title')}>
                            Thay đổi mật khẩu
                        </span>
                    </div>
                </div>
            </Link>
            <div className={cx('menu-item')} onClick={handleLogout}>
                <div className={cx('abc')}>
                    <span className={cx('menu-icon')}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>
                    <span className={cx('menu-title')}>Đăng xuất</span>
                </div>
            </div>
        </>
    );
}

// MenuItem.propTypes = {
//     data: PropTypes.object.isRequired,
//     onClick: PropTypes.func,
// };

export default MenuItem;
