import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { IoTextOutline, IoLocationOutline } from 'react-icons/io5';
import { useDebounce } from '~/hooks';
import * as searchService from '~/services/searchService';
import RenderSearchResult from './RenderSearchResult';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const inputRef = useRef();
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debouncedValue);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);
    const handleInputChange = (searchValue) => {
        if (searchValue.startsWith(' ')) {
            return;
        }
        setSearchValue(searchValue);
    };
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        // Thêm thẻ div để Tippy không warning
        <div>
            <HeadlessTippy
                interactive
                appendTo={() => document.body}
                // visible
                visible={showResult}
                placement="bottom"
                render={(attrs) => (
                    <div
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PopperWrapper>
                            {searchValue ? (
                                <div className={cx('search-value')}>
                                    <span className={cx('value')}>
                                        <span className={cx('value-icon')}>
                                            <IoTextOutline />
                                        </span>
                                        Tìm theo từ khóa "{searchValue}"
                                    </span>
                                </div>
                            ) : (
                                <div className={cx('search-value')}>
                                    <span className={cx('value')}>
                                        <span className={cx('value-icon')}>
                                            <IoLocationOutline />
                                        </span>
                                        Tìm nơi ở gần bạn
                                    </span>
                                </div>
                            )}
                            {searchValue.length > 0 ? (
                                <h4 className={cx('search-title')}>Đề xuất</h4>
                            ) : (
                                ''
                            )}
                            <RenderSearchResult
                                data={searchResult}
                                value={searchValue}
                            />
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Tìm nhanh. VD: Phòng trọ Lê Duẩn"
                        spellCheck={false}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && (
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}

                    <button className={cx('btn-search')}>
                        <span className={cx('icon-search')}>
                            <AiOutlineSearch />
                        </span>
                        <span className={cx('search-text')}>Tìm kiếm</span>
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
