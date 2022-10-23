import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeIcon,
    HomeIconActive,
    UserGroupIcon,
    UserGroupIconActive,
    LiveIcon,
    LiveIconActive,
} from '~/components/Icons';
import SuggestedAccounts from './SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div>
                <Menu>
                    <MenuItem
                        title="For you"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeIconActive />}
                    />
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupIconActive />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveIconActive />}
                    />
                </Menu>
                <SuggestedAccounts title="Suggested accounts" />
                <SuggestedAccounts title="Following accounts" />
                <SuggestedAccounts title="Following accounts" />
                <SuggestedAccounts title="Following accounts" />
            </div>
            <div className={cx('scrollbar')}></div>
        </aside>
    );
}

export default Sidebar;
