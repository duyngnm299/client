import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SavedItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function SavedItem({ data }) {
    return (
        <>
            {data.title !== undefined ? (
                <div className={cx('saved-item')}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={cx('deleted-icon')}
                    />
                    <>
                        <img src={data.img} alt="a" className={cx('image')} />
                    </>
                    <div className={cx('info')}>
                        <p className={cx('title')}>{data.title}</p>
                        <p className={cx('time')}>{data.time}</p>
                    </div>
                </div>
            ) : (
                <div className={cx('empty-saved')}>
                    <img src={images.emptySaved} alt="a" />
                </div>
            )}
        </>
    );
}

SavedItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default SavedItem;
