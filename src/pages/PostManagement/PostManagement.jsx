import classNames from 'classnames/bind';
import { useEffect } from 'react';
import styles from './Post.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function PostManagement() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-container')}>
                <img
                    src={images.slider1}
                    alt=""
                    className={cx('img img-1 show')}
                />
                <img src={images.slider2} alt="" className={cx('img img-2')} />
                <img src={images.slider3} alt="" className={cx('img img-3')} />
                <img src={images.slider4} alt="" className={cx('img img-4')} />
                <img src={images.slider5} alt="" className={cx('img img-5')} />
            </div>
        </div>
    );
}

export default PostManagement;
