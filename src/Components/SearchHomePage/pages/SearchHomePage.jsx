import React from 'react';
import classNames from 'classnames/bind';

import { BiRefresh } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from '../SearchHomePage.module.scss';
import { useState } from 'react';
import Category from '../components/category/Category';
const cx = classNames.bind(styles);

function SearchHomePage() {
    const [searchValue, setSearchValue] = useState('');
    console.log(searchValue);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <Category />

                <div className={cx('search-input')}>
                    <input
                        value={searchValue}
                        className={cx('input')}
                        type="text"
                        placeholder="Tìm nhanh. VD: Phòng trọ Lê Duẩn"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <button className={cx('btn-search')}>
                    <span className={cx('icon-search')}>
                        <AiOutlineSearch />
                    </span>
                    <span className={cx('search-text')}>Tìm kiếm</span>
                </button>
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
