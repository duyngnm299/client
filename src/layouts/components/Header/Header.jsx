import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';

import HeadLess from '@tippyjs/react/headless';

import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import {
    faPlus,
    // faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faGear,
    faUser,
    faCoins,
    faRightFromBracket,
    faBars,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Saved from '~/components/Popper/Saved';
// import Search from '../Search';
import config from '~/config';
import {
    faBell,
    faHeart,
    faMessage,
} from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const saved_items = [
    {
        img: 'https://file4.batdongsan.com.vn/crop/350x232/2022/03/28/20220328171905-6295_wm.jpg',
        title: 'Bảng giá Sunrise City- City View cập nhật giá bán T8.2022 (1PN-2.55tỷ), (2PN-3.5tỷ), (3PN-4.3tỷ)',
        time: 'Vừa lưu xong',
    },
];

function Header() {
    const currentUser = true;
    const [showSaved, setShowSaved] = useState(false);

    console.log(showSaved);
    // khi login thi currentUser = true
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faBars} />,
            title: 'Quản lý tin đăng',
            to: config.routes.postmng,
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Thay đổi thông tin cá nhân',
            to: config.routes.profile,
        },
        {
            icon: <FontAwesomeIcon icon={faLock} />,
            title: 'Thay đổi mật khẩu',
            to: config.routes.password,
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('right-header')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img
                            className={cx('logo-img')}
                            src={images.logo}
                            alt="logoTiktok"
                        />{' '}
                    </Link>
                    {/* <Search /> */}
                    <nav className={cx('navbar')}>
                        <ul className={cx('navbar-list')}>
                            <Link to={config.routes.motel}>
                                <li className={cx('navbar-item')}>Phòng trọ</li>
                            </Link>
                            <Link to={config.routes.house}>
                                <li className={cx('navbar-item')}>
                                    Nhà nguyên căn
                                </li>
                            </Link>
                            <Link to={config.routes.housefacade}>
                                <li className={cx('navbar-item')}>
                                    Nhà mặt phố
                                </li>
                            </Link>
                            <Link to={config.routes.office}>
                                <li className={cx('navbar-item')}>Văn phòng</li>
                            </Link>
                            <Link to={config.routes.apartment}>
                                <li className={cx('navbar-item')}>
                                    Chung cư, căn hộ
                                </li>
                            </Link>
                            <Link to={config.routes.ground}>
                                <li className={cx('navbar-item')}>Mặt bằng </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy
                                content="Tin đã lưu"
                                delay={(0, 200)}
                                placement="bottom"
                            >
                                <div>
                                    <Saved
                                        items={saved_items}
                                        show={showSaved}
                                        hide={() => {
                                            setShowSaved(false);
                                        }}
                                        // onClick={() => showSaved}
                                    >
                                        <button
                                            className={cx('action-btn')}
                                            onClick={() => {
                                                setShowSaved(!showSaved);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                className={cx('icon')}
                                            />
                                        </button>
                                    </Saved>
                                </div>
                            </Tippy>
                            <Tippy
                                content="Thông báo"
                                delay={(0, 200)}
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        className={cx('icon')}
                                    />
                                </button>
                            </Tippy>
                            <Tippy
                                content="Tin nhắn"
                                delay={(0, 200)}
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon
                                        icon={faMessage}
                                        className={cx('icon')}
                                    />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu
                        items={currentUser ? userMenu : null}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/301264677_1702038363505540_800329165601559843_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tIzc_YaXFe0AX_SKmZa&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT9VjdiQH4yRpgAgjOY7sm8lgiWohDHXZzgZmLALgeBYlQ&oe=635C813C"
                                alt="avatar"
                                // Link ảnh gốc lỗi => set ảnh khác khác ảnh no Image
                                fallBack="https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/248794374_1491385281237517_7930428664753935404_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=174925&_nc_ohc=5lauKy6zDsMAX9wvFT6&tn=VeXMx7MBEtEDqia-&_nc_ht=scontent-hkg4-2.xx&oh=00_AT9zAmle7fzxSbIGPvrXOsjlUnIraF6SkS8peSiVHZ7rAA&oe=63302978"
                            />
                        ) : (
                            ''
                        )}
                    </Menu>
                    <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Đăng tin
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
