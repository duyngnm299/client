import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ShowPost.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { getAllPost } from '~/api';

const cx = classNames.bind(styles);
const host_name = 'http://localhost:5000/';
console.log(process.env.HOST_NAME);
function ShowPost() {
    const [allPost, setAllPost] = useState([]);

    useEffect(() => {
        getAllPost()
            .then((res) => setAllPost(res?.data?.posts))
            .catch((err) => console.log(err));
    }, []);

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
                    <div key={index} className={cx('post-item')}>
                        <div className={cx('image-container')}>
                            <img
                                src={`${host_name}${item?.images[0]?.imagePath}`}
                                alt=""
                                className={cx('image')}
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
                                <span className={cx('area')}>{item.area}</span>
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
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={cx('icon-save')}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowPost;
