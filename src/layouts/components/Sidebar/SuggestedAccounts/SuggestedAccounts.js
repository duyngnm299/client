import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import RenderAccountItem from './RenderAccountItem';

const cx = classNames.bind(styles);

const data = [
    {
        id: 1,
        full_name: 'Mèo xinh đẹp',
        nickname: 'meoxinhdep.123',
        tick: true,
        followers: '11.7M',
        likes: '400M',
        avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/212452452_3184056991833644_2340086685205351640_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_ohc=Y_v7wdrgDeQAX8xQYl-&_nc_ht=scontent-hkg4-1.xx&oh=00_AT_3FIhwcedCh5zs6mdYC3YF4VPdgqWmHDX4ecirE5qsCA&oe=6332991A',
    },
    {
        id: 2,
        full_name: 'Nguyễn Ngọc Mạnh Duy',
        nickname: 'duyngnm.299',
        tick: true,
        followers: '10M',
        likes: '423M',
        avatar: 'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/301264677_1702038363505540_800329165601559843_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TEeh3EDWq0wAX8jSxjh&_nc_ht=scontent-hkg4-2.xx&oh=00_AT9ctqpGri2Pk0N-Hup46pR2gvPnnbqJmKV07okiLYywFA&oe=6332F9FC',
    },
    {
        id: 3,
        full_name: 'Lê Phượng',
        nickname: 'phuongle.123',
        tick: false,
        followers: '1.7M',
        likes: '20M',
        avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/285452147_1638208213221889_4526032417680652955_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=sfvrNQsValwAX8VYZLd&_nc_ht=scontent-hkg4-1.xx&oh=00_AT8I3321Fdu-tJKBmxxlTSyd94tEfs1l3us05M3_GjIOjw&oe=63332D5A',
    },
    {
        id: 4,
        full_name: 'Tân Mập',
        nickname: 'tanmap.123',
        tick: true,
        followers: '11.7M',
        likes: '400M',
        avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/279224326_1610579675984743_4306121649542732989_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=zEqz-DYeszEAX8SXQ2v&_nc_ht=scontent-hkg4-1.xx&oh=00_AT8r-jBF4UzkFncY89YxsrYFwqvsJj5EJRsWHTBsXhlh0A&oe=63333A7D',
    },
    {
        id: 5,
        full_name: 'Nguyễn Lê Thanh Tuyền',
        nickname: 'thanhtuyen.123',
        tick: false,
        followers: '1.2M',
        likes: '10M',
        avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/278912919_1607268282982549_7183487099437885210_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=VMtjEpRuOBQAX_dftRF&_nc_ht=scontent-hkg4-1.xx&oh=00_AT-Ey2shkY_Btdf6cL4xx4ZYHEqysfY0SyL4T4vxyngdUw&oe=63349CFB',
    },
];
function SuggestedAccounts({ title }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{title}</p>
            <RenderAccountItem data={data} />

            <p className={cx('see-all')}>See all</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    title: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
