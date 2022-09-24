import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './SuggestedAccounts.module.scss';
import Image from '~/components/Image';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('sidebar-preview')}>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };
    return (
        <div>
            <Tippy
                interactive
                offset={[-20, 2]}
                delay={[1000, 0]}
                placement="bottom"
                render={renderPreview}
            >
                <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        src={data.avatar}
                        alt="name"
                    />
                    <div className={cx('info-item')}>
                        <h4 className={cx('username')}>
                            {data.nickname}
                            {data.tick && (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className={cx('icon')}
                                />
                            )}
                        </h4>
                        <p className={cx('name')}>{data.full_name}</p>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}

export default AccountItem;
