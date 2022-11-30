import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import { FiCopy } from 'react-icons/fi';
import { MenuIcon } from '~/components/Icons';
import { IoPricetagsOutline } from 'react-icons/io5';
import { FiSettings } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
const postMngItems = {
    title: 'Quản lý bài đăng',
    childrenTitle: [
        {
            text: 'Đăng mới',
            to: config.routes.post,
        },
        {
            text: 'Danh sách tin đăng',
            to: config.routes.postlist,
        },
        { text: 'Tin nháp', to: '#' },
    ],
};
const financialMngItems = {
    title: 'Quản lý tài chính',
    childrenTitle: [
        {
            text: 'Lịch sử giao dịch',
            to: '#',
        },
        {
            text: 'Lịch sử thanh toán',
            to: '#',
        },
        { text: 'Nạp tiền vào tài khoản', to: '#' },
    ],
};

const costsMngItems = {
    title: 'Báo giá & hướng dẫn',
    childrenTitle: [
        {
            text: 'Báo giá',
            to: '#',
        },
        {
            text: 'Hướng dẫn thanh toán',
            to: '#',
        },
        { text: 'Hướng dẫn sử dụng', to: '#' },
    ],
};
const utilityMngItems = {
    title: 'Tiện ích',
    childrenTitle: [
        {
            text: 'Thông báo',
            to: '#',
        },
        {
            text: 'Yêu cầu khóa tài khoản',
            to: '#',
        },
    ],
};
function Sidebar(checked) {
    const [showPostItem, setShowPostItem] = useState(false);
    const [showFinancialItem, setShowFinancialItem] = useState(false);
    const [showCostItem, setShowCostItem] = useState(false);
    const [showUtilityItem, setShowUtilityItem] = useState(false);
    const [postMngIndex, setPostMngIndex] = useState(0);
    const [financialMngIndex, setFinancialMngIndex] = useState(-1);
    const [costsMngIndex, setCostsMngIndex] = useState(-1);
    const [utilityMngIndex, setUtilityMngIndex] = useState(-1);
    const currentUser = useSelector(
        (state) => state.auth.login?.currentUser?.user,
    );
    const formatCash = (number) => {
        return number
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ',') + prev;
            });
    };
    console.log(checked);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <div className={cx('user')}>
                    <div className={cx('user-avatar')}>
                        <img
                            src={
                                currentUser?.profilePicture
                                    ? currentUser.profilePicture
                                    : images.defaultAvt
                            }
                            alt="avatar"
                            className={cx('avatar')}
                        />
                    </div>
                    <div className={cx('user-details')}>
                        <span className={cx('username')}>
                            {currentUser?.typeAccount === 'google'
                                ? currentUser?.fullName
                                : currentUser?.username}
                        </span>
                        <span className={cx('email')}>
                            {currentUser?.email
                                ? currentUser.email + 'aaaaaaaaaaaaaaaaa'
                                : 'Chưa cập nhật email'}
                        </span>
                    </div>
                </div>
                <div className={cx('account-balance')}>
                    <div className={cx('member')}>
                        <div className={cx('left')}>
                            <span className={cx('member-text')}>
                                Mã thành viên
                            </span>
                            <span className={cx('member-code')}>
                                {currentUser?.memberCode}
                            </span>
                        </div>
                        <FiCopy className={cx('right')} />
                    </div>
                    <div className={cx('balance')}>
                        <p className={cx('balance-title')}>Số dư tài khoản</p>

                        <div className={cx('separate')}>
                            <span className={cx('balance-text')}>
                                TK chính:{' '}
                            </span>
                            <span className={cx('balance-number')}>
                                {currentUser &&
                                    formatCash(
                                        currentUser?.balance.toString(),
                                    )}{' '}
                                VND
                            </span>
                        </div>
                    </div>
                    <button className={cx('btn-payment')}>Nạp tiền</button>
                </div>
            </div>
            <div className={cx('post-container')}>
                <div
                    className={cx(
                        'post-management',
                        postMngIndex !== -1 && 'title-active',
                    )}
                    onClick={() => setShowPostItem(!showPostItem)}
                >
                    <span className={cx('left-icon')}>
                        <MenuIcon />
                    </span>
                    <span className={cx('text')}>{postMngItems.title}</span>
                    <span className={cx('right-icon')}>
                        {showPostItem ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowRight />
                        )}
                    </span>
                </div>
                {postMngIndex !== -1 || showPostItem ? (
                    <>
                        {postMngItems.childrenTitle.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div
                                    className={cx(
                                        'post-item',
                                        postMngIndex === index && 'active',
                                    )}
                                    onClick={() => {
                                        setFinancialMngIndex(-1);
                                        setUtilityMngIndex(-1);
                                        setCostsMngIndex(-1);
                                        setPostMngIndex(index);
                                    }}
                                >
                                    <span className={cx('text')}>
                                        {item.text}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    ''
                )}
            </div>
            <div className={cx('financial-container')}>
                <div
                    className={cx(
                        'financial-management',
                        financialMngIndex !== -1 && 'title-active',
                    )}
                    onClick={() => setShowFinancialItem(!showFinancialItem)}
                >
                    <span className={cx('left-icon')}>
                        <RiMoneyDollarCircleLine />
                    </span>
                    <span className={cx('text')}>
                        {financialMngItems.title}
                    </span>
                    <span className={cx('right-icon')}>
                        {showFinancialItem ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowRight />
                        )}
                    </span>
                </div>
                {showFinancialItem ? (
                    <>
                        {financialMngItems.childrenTitle.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div
                                    className={cx(
                                        'financial-item',
                                        financialMngIndex === index && 'active',
                                    )}
                                    onClick={() => {
                                        setPostMngIndex(-1);
                                        setUtilityMngIndex(-1);
                                        setCostsMngIndex(-1);
                                        setFinancialMngIndex(index);
                                    }}
                                >
                                    <span className={cx('text')}>
                                        {item.text}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    ''
                )}
            </div>
            <div className={cx('cost-container')}>
                <div
                    className={cx(
                        'cost-management',
                        costsMngIndex !== -1 && 'title-active',
                    )}
                    onClick={() => setShowCostItem(!showCostItem)}
                >
                    <span className={cx('left-icon')}>
                        <IoPricetagsOutline />
                    </span>
                    <span className={cx('text')}>{costsMngItems.title}</span>
                    <span className={cx('right-icon')}>
                        {showCostItem ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowRight />
                        )}
                    </span>
                </div>

                {showCostItem ? (
                    <>
                        {costsMngItems.childrenTitle.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div
                                    className={cx(
                                        'cost-item',
                                        costsMngIndex === index && 'active',
                                    )}
                                    onClick={() => {
                                        setPostMngIndex(-1);
                                        setFinancialMngIndex(-1);
                                        setUtilityMngIndex(-1);
                                        setCostsMngIndex(index);
                                    }}
                                >
                                    <span className={cx('text')}>
                                        {item.text}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    ''
                )}
            </div>
            <div className={cx('utility-container')}>
                <div
                    className={cx(
                        'utility-management',
                        utilityMngIndex !== -1 && 'title-active',
                    )}
                    onClick={() => setShowUtilityItem(!showUtilityItem)}
                >
                    <span className={cx('left-icon')}>
                        <FiSettings />
                    </span>
                    <span className={cx('text')}>{utilityMngItems.title}</span>
                    <span className={cx('right-icon')}>
                        {showUtilityItem ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowRight />
                        )}
                    </span>
                </div>

                {showUtilityItem ? (
                    <>
                        {utilityMngItems.childrenTitle.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div
                                    className={cx(
                                        'utility-item',
                                        utilityMngIndex === index && 'active',
                                    )}
                                    onClick={() => {
                                        setCostsMngIndex(-1);
                                        setFinancialMngIndex(-1);
                                        setPostMngIndex(-1);
                                        setUtilityMngIndex(index);
                                    }}
                                >
                                    <span className={cx('text')}>
                                        {item.text}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default Sidebar;
