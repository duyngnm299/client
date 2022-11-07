import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Category.module.scss';
import { AiOutlineHome } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
// import CategoryItem from './CategoryItem';
import Tippy from '@tippyjs/react';

import { BiRefresh } from 'react-icons/bi';
import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

const cx = classNames.bind(styles);

const category_items = [
    {
        icon: <AiOutlineHome />,
        text: 'Phòng trọ',
        isChecked: false,
    },
    {
        icon: <AiOutlineHome />,
        text: 'Nhà nguyên căn',
        isChecked: false,
    },
    {
        icon: <AiOutlineHome />,
        text: 'Nhà mặt phố',
        isChecked: false,
    },
    {
        icon: <AiOutlineHome />,
        text: 'Văn phòng',
        isChecked: false,
    },
    {
        icon: <AiOutlineHome />,
        text: 'Chung cư - căn hộ',
        isChecked: false,
    },
    {
        icon: <AiOutlineHome />,
        text: 'Mặt bằng',
        isChecked: false,
    },
];
// const defaultFn = () => {};
function Category({
    icon,
    show = false,
    children,

    hide,
    // onChange = defaultFn,
}) {
    const [data, setData] = useState([]);
    const [nameCategory, setNameCategory] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const [checked, setChecked] = useState([]);
    const [ipChecked, setIpCheck] = useState(true);
    // const nameCategory = [];

    useEffect(() => {
        setData(category_items);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleChange = (e) => {
        const { name } = e.target;

        let itemChecked = category_items[name];
        let updateList = [...checked];

        if (e.target.checked) {
            setIpCheck(true);
            itemChecked = { ...itemChecked, isChecked: true };
            updateList.push(itemChecked);
            console.log(updateList);
            category_items[name].isChecked = true;
            setNameCategory([...nameCategory, itemChecked.text]);
        } else {
            let newItemChecked = { ...itemChecked, isChecked: false };
            console.log(newItemChecked);
            category_items[name].isChecked = false;

            updateList = updateList.filter(
                (item) => !item.text.includes(newItemChecked.text),
            );

            setNameCategory(
                nameCategory.filter((item) => item !== newItemChecked.text),
            );
            // console.log(b);
            // updateList = updateList.filter((item) => {
            //     return item !== newItemChecked;
            // });
            // console.log(itemChecked);
            // updateList.splice(itemChecked, 0);

            console.log(updateList);
            // checked.filter(
            //     (item) => item.isChecked !== itemChecked.isChecked,
            // ),
            // eslint-disable-next-line no-sequences
            // setChecked(...checked, checked.filter());
            // setChecked(
            //     ...checked,
            //     checked.filter((item) => item === item?.isChecked),
            // );
        }
        setChecked(updateList);
    };

    // const checkedItems = checked.length
    //     ? checked.reduce((total, item) => {
    //           return total + item;
    //       })
    //     : '';

    console.log(checked);

    const renderItems = () => {
        return data.map((item, index) => {
            // console.log(item.isChecked);
            return (
                <label
                    key={index}
                    // htmlFor={`checkbox${index}`}
                    className={cx('category-item')}
                >
                    <span className={cx('icon')}>{icon}</span>
                    <span className={cx('text')}>{item.text}</span>
                    <input
                        name={index}
                        value={{ item }}
                        id={`checkbox${index}`}
                        className={cx('checkbox')}
                        type="checkbox"
                        checked={
                            ipChecked
                                ? category_items[index]?.isChecked
                                : ipChecked
                        }
                        onChange={handleChange}
                    />
                </label>
            );
        });
    };

    const handleRefresh = () => {
        setIpCheck(false);
        setChecked([]);
        category_items.map((item) => (item.isChecked = false));
    };

    const renderResult = (attrs) => (
        <div className={cx('category-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('category-popper')}>
                <div className={cx('category-body')}>{renderItems()}</div>
                <div className={cx('refresh')}>
                    <div className={cx('left')} onClick={handleRefresh}>
                        <BiRefresh className={cx('rf-icon')} />
                        <p className={cx('rf-text')}>Đặt lại</p>
                    </div>
                    <button className={cx('btn-refresh')}>Áp dụng</button>
                </div>
            </PopperWrapper>
        </div>
    );
    // console.log(nameCategory);
    return (
        <Tippy
            className={cx('tippy-content')}
            content={
                nameCategory ? (
                    <div>
                        {nameCategory?.map((name, index) => (
                            <div key={index} style={{ fontSize: '1.2rem' }}>
                                {name}
                                <br />
                            </div>
                        ))}
                    </div>
                ) : null
            }
            disabled={!nameCategory[0] ? true : false}
            delay={(0, 200)}
            placement="bottom"
        >
            <div>
                <HeadlessTippy
                    // visible
                    visible={showCategory}
                    delay={[0, 1000]}
                    offset={[90, 8]}
                    interactive
                    placement="bottom-end"
                    render={renderResult}
                    onClickOutside={() => setShowCategory(false)}
                >
                    <div
                        className={cx('category')}
                        onClick={() => setShowCategory(!showCategory)}
                    >
                        {checked.length > 0 ? (
                            <>
                                <span className={cx('icon-left')}>
                                    {checked[checked.length - 1].icon}
                                </span>
                                <span className={cx('text-ctgr')}>
                                    {' '}
                                    {checked[checked.length - 1].text}
                                </span>
                                <span className={cx('icon-right')}>
                                    <MdKeyboardArrowDown />
                                </span>
                            </>
                        ) : (
                            <>
                                <span className={cx('icon-left')}>
                                    <AiOutlineHome />
                                </span>
                                <span className={cx('text-ctgr')}>
                                    Loại tìm kiếm
                                </span>
                                <span className={cx('icon-right')}>
                                    <MdKeyboardArrowDown />
                                </span>
                            </>
                        )}
                    </div>
                </HeadlessTippy>
            </div>
        </Tippy>
    );
}

Category.propTypes = {
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    // onChange: PropTypes.func,
};

export default Category;
