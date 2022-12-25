import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NavbarPostList.module.scss';
import images from '~/assets/images';
import { TbListDetails } from 'react-icons/tb';
import { BiPencil } from 'react-icons/bi';
import { MdMoreHoriz } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getPostOfUser, checkExpiredPost } from '~/api';
import DetailPostOfUser from './DetailPostOfUser';
const cx = classNames.bind(styles);

const item = ['Tất cả', 'Hết hạn', 'Đang hiển thị', 'Chờ hiển thị'];
const HOST_NAME = process.env.REACT_APP_HOST_NAME;
function NavbarPostList() {
    const [indexId, setIndexId] = useState(0);
    const [postList, setPostList] = useState([]);
    const [currentPost, setCurrentPost] = useState([]);
    const [showDetailPost, setShowDetailPost] = useState(false);
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const modal = useSelector((state) => state.post.modal?.show);
    console.log(modal);
    const id = currentUser?.user?._id;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    useEffect(() => {
        getPostOfUser(id).then((res) => setPostList(res.posts));
    }, []);

    useEffect(() => {
        setShowDetailPost(false);
    }, [modal]);

    const checkExpiredDate = (endDate) => {
        const arr = endDate.split('/');
        const d = parseInt(arr[0]);
        const m = parseInt(arr[1]);
        const y = parseInt(arr[2]);
        console.log(day - d);
        if (year === y) {
            if (month === m) {
                if (day - d > 0) {
                    return true;
                }
                if (day - d <= 0) {
                    return false;
                }
            }
            if (month > m) {
                return true;
            }
        }
        if (year < y) {
            return true;
        }
    };
    const handleCategory = (name) => {
        switch (name) {
            case 'Phòng trọ':
                return 'Cho thuê nhà trọ, phòng trọ';
            case 'Nhà nguyên căn':
                return 'Cho thuê nhà nguyên căn';
            case 'Văn phòng':
                return 'Cho thuê văn phòng';
            case 'Chung cư - căn hộ':
                return 'Cho thuê chung cư, căn hộ';
            case 'Mặt bằng':
                return 'Cho thuê mặt bằng';
            case 'Tìm người ở ghép':
                return 'Tìm người ở ghép';
            default:
                return 'Cho thuê nhà trọ, phòng trọ';
        }
    };
    const handleStatus = (item) => {
        switch (item) {
            case 'waiting for approva':
                return 'Chờ duyệt';
            case 'approved':
                return 'Đã duyệt';
            case 'deleted':
                return 'Đã xóa';
            case 'expired':
                return 'Đã hết hạn';
            default:
                break;
        }
    };
    const handleShowPost = (index) => {
        switch (index) {
            case 0:
                getPostOfUser(id).then((res) => setPostList(res.posts));
                return;
            case 1:
                setPostList([]);
                getPostOfUser(id).then((res) => {
                    res.posts.map((item) => {
                        let check = checkExpiredDate(item.endDate);
                        if (check) {
                            checkExpiredPost(item._id).then((res) => {
                                setPostList((prev) => [
                                    ...prev,
                                    res?.postExpired,
                                ]);
                            });
                        }
                    });
                });
                return;
            case 2:
                getPostOfUser(id).then((res) =>
                    setPostList(
                        res.posts.filter((item) => item.status === 'approved'),
                    ),
                );
                return;
            case 3:
                getPostOfUser(id).then((res) =>
                    setPostList(
                        res.posts.filter(
                            (item) => item.status === 'waiting for approva',
                        ),
                    ),
                );
                return;
            default:
                break;
        }
    };
    const handleDetailsPost = (item) => {
        setShowDetailPost(true);
        setCurrentPost(item);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                {item?.map((item, index) => (
                    <div
                        key={index}
                        className={cx(
                            'navbar-item',
                            indexId === index ? 'active' : '',
                        )}
                        onClick={() => {
                            setIndexId(index);
                            handleShowPost(index);
                        }}
                    >
                        <p className={cx('title')}>
                            {item} (
                            {(indexId === index && postList?.length) || 0})
                        </p>
                    </div>
                ))}
            </div>
            {postList?.length === 0 ? (
                <div className={cx('post-list-container')}>
                    <div className={cx('post-list')}>
                        <img src={images.emptyPost} alt="" />
                        <span className={cx('no-post')}>
                            Không có bài đăng nào
                        </span>
                        <button className={cx('btn-new-post')}>
                            Đăng tin mới
                        </button>
                    </div>
                </div>
            ) : (
                <div className={cx('post-list-container')}>
                    <div className={cx('select-all')}>
                        <input
                            id="cb"
                            type="checkbox"
                            className={cx('checkbox')}
                        />
                        <label htmlFor="cb" className={cx('cb-text')}>
                            Chọn tất cả
                        </label>
                    </div>

                    {postList?.map((item, index) => (
                        <div className={cx('post-item-wrapper')} key={index}>
                            {showDetailPost && (
                                <DetailPostOfUser item={currentPost} />
                            )}
                            <div className={cx('post-item')}>
                                <div className={cx('top')}>
                                    <div className={cx('image')}>
                                        <img
                                            src={`${HOST_NAME}${item?.images[0]?.imagePath}`}
                                            alt="abc"
                                            className={cx('img')}
                                        />
                                    </div>
                                    <div className={cx('info')}>
                                        <div className={cx('heading-wrapper')}>
                                            <p className={cx('heading')}>
                                                {item.title}
                                            </p>
                                            <p className={cx('sub-heading')}>
                                                {handleCategory(
                                                    item?.category_name,
                                                )}{' '}
                                                • {item?.district},{' '}
                                                {item?.province}
                                            </p>
                                        </div>
                                        <div className={cx('describe')}>
                                            <div className={cx('status')}>
                                                <p className={cx('title')}>
                                                    Trạng thái
                                                </p>
                                                <p
                                                    className={cx(
                                                        'text-status',
                                                    )}
                                                >
                                                    {handleStatus(item?.status)}
                                                </p>
                                            </div>
                                            <div className={cx('status')}>
                                                <p className={cx('title')}>
                                                    Mã tin
                                                </p>
                                                <p className={cx('text')}>
                                                    {item?.postCode}
                                                </p>
                                            </div>
                                            <div className={cx('status')}>
                                                <p className={cx('title')}>
                                                    Loại tin
                                                </p>
                                                <p className={cx('text')}>
                                                    {item?.postType}
                                                </p>
                                            </div>
                                            <div className={cx('status')}>
                                                <p className={cx('title')}>
                                                    Ngày đăng
                                                </p>
                                                <p className={cx('text')}>
                                                    {item?.startDate}
                                                </p>
                                            </div>
                                            <div className={cx('status')}>
                                                <p className={cx('title')}>
                                                    Ngày hết hạn
                                                </p>
                                                <p className={cx('text')}>
                                                    {item?.endDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('bottom')}>
                                    <div className={cx('left')}>
                                        <input
                                            type="checkbox"
                                            className={cx('checkbox')}
                                            id="cb2"
                                        />
                                        <label
                                            htmlFor="cb2"
                                            className={cx('cb-text')}
                                        >
                                            #{index + 1}
                                        </label>
                                    </div>
                                    <div className={cx('right')}>
                                        <>
                                            <div
                                                className={cx('button')}
                                                onClick={() =>
                                                    handleDetailsPost(item)
                                                }
                                            >
                                                <TbListDetails
                                                    className={cx('icon')}
                                                />
                                                <span
                                                    className={cx(
                                                        'text-control',
                                                    )}
                                                >
                                                    Chi tiết
                                                </span>
                                            </div>
                                            <div className={cx('button')}>
                                                <BiPencil
                                                    className={cx('icon')}
                                                />
                                                <span
                                                    className={cx(
                                                        'text-control',
                                                    )}
                                                >
                                                    Sửa tin
                                                </span>
                                            </div>
                                            <div className={cx('button')}>
                                                <MdMoreHoriz
                                                    className={cx('icon')}
                                                />
                                                <span
                                                    className={cx(
                                                        'text-control',
                                                    )}
                                                >
                                                    Thao tác
                                                </span>
                                            </div>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NavbarPostList;
