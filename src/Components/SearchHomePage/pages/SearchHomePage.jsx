import React, { useRef } from 'react';
import classNames from 'classnames/bind';

import { BiRefresh } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from '../SearchHomePage.module.scss';

import Category from '../components/category/Category';
import Search from '../components/Search';

const cx = classNames.bind(styles);

function SearchHomePage() {
    // const [searchValue, setSearchValue] = useState('');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <Category />
                <Search />
            </div>
            <div className={cx('search-filter')}>
                <div className={cx('item')}>
                    <span className={cx('text')}>Khu vực</span>

                    <span className={cx('icon')}>
                        <MdKeyboardArrowDown />
                    </span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('text')}>Mức giá</span>

                    <span className={cx('icon')}>
                        <MdKeyboardArrowDown />
                    </span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('text')}>Diện tích</span>

                    <span className={cx('icon')}>
                        <MdKeyboardArrowDown />
                    </span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('text')}>Lọc thêm</span>

                    <span className={cx('icon')}>
                        <MdKeyboardArrowDown />
                    </span>
                </div>
                <div className={cx('refresh')}>
                    <span className={cx('refresh-icon')}>
                        <BiRefresh />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SearchHomePage;
