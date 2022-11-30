import classNames from 'classnames/bind';
import styles from './HaveSidebarLayout.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function HaveSidebarLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HaveSidebarLayout;
