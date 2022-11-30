import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import Image from '~/components/Image';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';

const cx = classNames.bind(styles);

function SearchItem({ data, value }) {
    return (
        <div>
            <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
                <div className={cx('info-container')}>
                    <AiOutlineHome className={cx('icon')} />

                    <div className={cx('info')}>
                        <h4 className={cx('title')}>
                            {data.full_name}
                            {data.tick && (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className={cx('icon')}
                                />
                            )}
                        </h4>
                        <span className={cx('address')}>{data.nickname}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

SearchItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default SearchItem;
