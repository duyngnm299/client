import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import {
    faPlus,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faGear,
    faUser,
    faCoins,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { MessageIcon, NotiIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;

    // khi login thi currentUser = true
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@user',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="logoTiktok" />{' '}
                </Link>
                <Search />
                <div className={cx('action')}>
                    <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Upload
                    </Button>

                    {currentUser ? (
                        <>
                            <Tippy
                                content="Message"
                                delay={(0, 200)}
                                placement="bottom"
                            >
                                <button className={cx('action-btn', 'msgIcon')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy
                                content="Notifications"
                                delay={(0, 200)}
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <NotiIcon />
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
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://scontent-mad1-1.xx.fbcdn.net/v/t39.30808-6/301264677_1702038363505540_800329165601559843_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yotdFxV0ZQsAX8tZMEs&_nc_ht=scontent-mad1-1.xx&oh=00_AT_HrLrLctfbPitdjYVJ3PpRYfgloKqCGonLhX0kQ7s11g&oe=632F057C"
                                alt="avatar"
                                // Link ảnh gốc lỗi => set ảnh khác khác ảnh no Image
                                fallBack="https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/248794374_1491385281237517_7930428664753935404_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=174925&_nc_ohc=5lauKy6zDsMAX9wvFT6&tn=VeXMx7MBEtEDqia-&_nc_ht=scontent-hkg4-2.xx&oh=00_AT9zAmle7fzxSbIGPvrXOsjlUnIraF6SkS8peSiVHZ7rAA&oe=63302978"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                {<FontAwesomeIcon icon={faEllipsisVertical} />}
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
