import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import * as searchService from '~/services/searchService';
import RenderSearchResult from './RenderSearchResult';

const cx = classNames.bind(styles);
function Search({ className }) {
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
    const classes = cx('search', {
        [className]: className,
    });
    return (
        // Thêm thẻ div để Tippy không warning
        <div>
            <HeadlessTippy
                interactive
                appendTo={() => document.body}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div
                        className={cx(
                            className
                                ? 'search-result-post-list'
                                : 'search-result',
                        )}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PopperWrapper>
                            <h4
                                className={cx(
                                    className
                                        ? 'search-title-post-list'
                                        : 'search-title',
                                )}
                            >
                                {className ? 'Bài đăng' : 'Tài khoản'}
                            </h4>
                            <RenderSearchResult data={searchResult} />
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={classes}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={
                            className
                                ? 'Tìm theo mã tin, tiêu đề'
                                : 'Tìm nhanh. VD: Phòng trọ Lê Duẩn'
                        }
                        spellCheck={false}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx(
                                className ? 'clear-post-list' : 'clear',
                            )}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && (
                        <FontAwesomeIcon
                            className={cx(
                                className ? 'loading-post-list' : 'loading',
                            )}
                            icon={faSpinner}
                        />
                    )}

                    <button
                        className={cx(
                            className ? 'search-btn-post-list' : 'search-btn',
                        )}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <SearchIcon
                            width={className && '1.8rem'}
                            height={className && '1.8rem'}
                        />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
