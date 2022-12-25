import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import Result from './components/Result';
import FilterSRS from './components/FilterSRS';
const cx = classNames.bind(styles);
function SearchResult({ house }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Result />
                <FilterSRS />
            </div>
        </div>
    );
}

export default SearchResult;
