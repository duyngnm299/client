import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt="name" />
                <div>
                    <Button className={cx('follow-btn')} primary>
                        <span>Follow</span>
                    </Button>
                </div>
            </div>
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
            <p className={cx('analytics')}>
                <strong className={cx('count')}>{data.followers}</strong>
                <span className={cx('label')}>Followers</span>
                <strong className={cx('count')}>{data.likes}</strong>
                <span className={cx('label')}>Likes</span>
            </p>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.array.isRequired,
};
export default AccountPreview;
