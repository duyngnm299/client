import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowsRotate,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function SearchBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <Search />
            </div>
            <div className={cx('sort-wrapper')}>
                <div className={cx('sort-item')}>
                    <div className={cx('title-wrapper')}>
                        <span className={cx('title')}>Phân loại</span>
                        <span>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faChevronDown}
                            />
                        </span>
                    </div>
                    <p className={cx('sort-value')}>Tất cả</p>
                </div>
                <div className={cx('sort-item')}>
                    <div className={cx('title-wrapper')}>
                        <span className={cx('title')}>Khu vực</span>
                        <span>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faChevronDown}
                            />
                        </span>
                    </div>

                    <p className={cx('sort-value')}>Tất cả</p>
                </div>
                <div className={cx('sort-item')}>
                    <div className={cx('title-wrapper')}>
                        <span className={cx('title')}>Mức giá</span>
                        <span>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faChevronDown}
                            />
                        </span>
                    </div>

                    <p className={cx('sort-value')}>Tất cả</p>
                </div>
                <div className={cx('sort-item')}>
                    <div className={cx('title-wrapper')}>
                        <span className={cx('title')}>Diện tích</span>
                        <span>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faChevronDown}
                            />
                        </span>
                    </div>
                    <p className={cx('sort-value')}>Tất cả</p>
                </div>
                <div className={cx('sort-item')}>
                    <div className={cx('refresh')}>
                        <span>
                            <FontAwesomeIcon
                                className={cx('icon-refresh')}
                                icon={faArrowsRotate}
                            />
                        </span>
                        <span className={cx('title-refresh')}>Đặt lại</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
