import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/301264677_1702038363505540_800329165601559843_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aksntSwIHKsAX-L7QEV&_nc_ht=scontent-hkg4-2.xx&oh=00_AT_CvrnOd8IhRK5UimilyglU2vL84BiFmsCI9B8YVQdCEw&oe=632B10FC"
                alt="name"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    Nguyen Van A
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={cx('icon')}
                    />
                </h4>
                <span className={cx('username')}>ngueynvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
