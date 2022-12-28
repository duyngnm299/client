import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ShowPost.module.scss';
import {
    getUser,
    SearchFilterPost,
    updateExpiredPost,
    updatePost,
} from '~/api';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { currentPost } from '~/redux/slice/postSlice';
import ImageSlider from '../ImageSlider';
import Button from '../Button';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import {
    areaRange,
    currentCategory,
    currentDistrict,
    priceRange,
    searchText,
} from '~/redux/slice/filterSlice';

const cx = classNames.bind(styles);
const host_name = process.env.REACT_APP_HOST_NAME;
function ShowPost() {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state) => state.auth.login?.currentUser?.user,
    );

    // console.log(crPost);
    const [allPost, setAllPost] = useState([]);
    const [savePost, setSavePost] = useState({});
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    console.log(totalPage);
    useEffect(() => {
        dispatch(searchText(null));
        dispatch(currentCategory(null));
        dispatch(currentDistrict(null));
        dispatch(priceRange(null));
        dispatch(areaRange(null));
        if (currentUser?._id) {
            getUser(currentUser._id).then((res) => {
                res?.user?.savedPost.filter((item) =>
                    setSavePost({ ...savePost, [item._id]: true }),
                );
            });
        }
        SearchFilterPost(`type=Tin nổi bật&status=approved`)
            .then((res) => {
                console.log(res.pagination);
                setTotalPage(Math.ceil(res?.pagination?.total / limit));
                setAllPost(res?.post);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        SearchFilterPost().then((res) =>
            res.post.map((item) => {
                let check = checkExpiredDate(item.endDate);
                if (check) {
                    const data = {
                        status: 'expired',
                    };
                    updateExpiredPost(item._id, data).then(console.log(res));
                }
            }),
        );
    }, []);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
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
            return false;
        }
    };
    const handleOnClick = (item) => {
        dispatch(currentPost(item));
    };

    const handleOnClickMore = () => {
        let nextPage = currentPage + 1;
        if (totalPage - nextPage >= 0) {
            SearchFilterPost(`type=Tin nổi bật&page=${nextPage}`).then((res) =>
                res?.post.map((item) =>
                    setAllPost((prevState) => [...prevState, item]),
                ),
            );
            setCurrentPage(nextPage);
            return;
        }
        if (totalPage - nextPage < 0) {
            SearchFilterPost(`type=Tin nổi bật`).then((res) =>
                setAllPost(res?.post),
            );
            setCurrentPage(1);
            return;
        }
    };
    const currentDate = new Date();
    const handleDate = (createdAt) => {
        const createdDate = new Date(createdAt);
        if (currentDate.getFullYear() === createdDate.getFullYear()) {
            if (currentDate.getMonth() === createdDate.getMonth()) {
                let result = currentDate.getDate() - createdDate.getDate();
                if (result === 0) {
                    return 'Hôm nay';
                }
                return `${result} ngày trước`;
            } else {
                let result = currentDate.getMonth() - createdDate.getMonth();
                return `${result} tháng trước`;
            }
        } else {
            let result = currentDate.getFullYear() - createdDate.getFullYear();
            return `${result} năm trước`;
        }
    };

    const formatCash = (number) => {
        return number
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ',') + prev;
            });
    };
    // console.log(currentDate);
    // console.log(allPost);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Bất động sản dành cho bạn</h2>
            <div className={cx('post-container')}>
                {allPost?.map((item, index) => (
                    <Link key={index} to={config.routes.detailPage}>
                        <div
                            className={cx('post-item')}
                            onClick={() => handleOnClick(item)}
                        >
                            <div className={cx('image-container')}>
                                <ImageSlider
                                    className={cx('show-post-slider')}
                                    slides={item && item.images}
                                    showPost={true}
                                />
                            </div>
                            <div className={cx('describe')}>
                                <p className={cx('title')}>{item.title}</p>
                                <div className={cx('price-area')}>
                                    <span className={cx('price')}>
                                        {formatCash(`${item.price}`)}{' '}
                                    </span>
                                    <span className={cx('unit')}>VND</span>
                                    <span className={cx('dot')}>·</span>
                                    <span className={cx('area')}>
                                        {item.area}
                                    </span>
                                    <span className={cx('unit')}>m²</span>
                                </div>
                                <p className={cx('address')}>
                                    {`${item?.district}, ${item?.province}`}
                                </p>
                                <div className={cx('date-save')}>
                                    <p className={cx('date')}>
                                        {handleDate(item.createdAt)}
                                    </p>

                                    <p className={cx('save')}>
                                        {item.postType}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {allPost?.length > limit && (
                <div className={cx('more-post')}>
                    <Button
                        className={cx('more-btn')}
                        outline
                        rightIcon={
                            totalPage > currentPage ? (
                                <MdKeyboardArrowDown />
                            ) : (
                                <MdKeyboardArrowUp />
                            )
                        }
                        more={true}
                        onClick={handleOnClickMore}
                    >
                        {totalPage > currentPage ? 'Mở rộng' : 'Thu gọn'}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ShowPost;
