import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <div className={classes}>
            <Link to={data.to}>
                <div className={cx('abc')}>
                    <span className={cx('menu-icon')}>{data.icon}</span>
                    <span className={cx('menu-title')}>{data.title}</span>
                </div>
            </Link>
        </div>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
