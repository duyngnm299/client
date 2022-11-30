import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchByAddress.module.scss';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsChevronDown } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { address_list } from '~/components/AddressList';
const cx = classNames.bind(styles);

function SearchByAddress() {
    const [districtList, setDistrictList] = useState([]);
    const [provinceValue, setProvinceValue] = useState('Đà Nẵng');
    const [districtValue, setDistrictValue] = useState('');
    const [district, setDistrict] = useState(false);
    const [address, setAddress] = useState(false);
    const [addressValue, setAddressValue] = useState('Khu vực');
    useEffect(() => {
        address_list.map((item) => {
            return setDistrictList((prevState) => [...prevState, item]);
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('search-by-address')}
                onClick={() => setAddress(!address)}
            >
                <MdOutlineLocationOn className={cx('icon-left')} />
                <span className={cx('text')}>{addressValue}</span>
                <BsChevronDown className={cx('icon-right')} />
            </div>
            <div className={cx('content')}>
                {address && (
                    <div className={cx('address-item')}>
                        <div className={cx('province')}>
                            <label className={cx('title')}>
                                Tỉnh, thành phố{' '}
                                <span>
                                    <FontAwesomeIcon
                                        icon={faAsterisk}
                                        className={cx('asterisk-icon')}
                                    />
                                </span>
                            </label>
                            <div className={cx('address-input-wrapper')}>
                                <input
                                    value={provinceValue}
                                    type="text"
                                    readOnly
                                    disabled
                                    className={cx('input', 'disabled')}
                                    placeholder="Chọn"
                                />
                                <span className={cx('icon')}>
                                    <BsChevronDown />
                                </span>
                            </div>
                        </div>
                        <div className={cx('district')}>
                            <label className={cx('title')}>
                                Quận, huyện{' '}
                                <span>
                                    <FontAwesomeIcon
                                        icon={faAsterisk}
                                        className={cx('asterisk-icon')}
                                    />
                                </span>
                            </label>
                            <div className={cx('address-input-wrapper')}>
                                <input
                                    value={districtValue}
                                    type="text"
                                    className={cx('input')}
                                    readOnly
                                    placeholder="Chọn"
                                    onClick={() => setDistrict(!district)}
                                />
                                <span className={cx('icon')}>
                                    <BsChevronDown />
                                </span>
                                {district && (
                                    <div className={cx('address-items')}>
                                        {districtList.map((item, index) => (
                                            <p
                                                tabIndex={index}
                                                key={index}
                                                className={cx('item')}
                                                onClick={() => {
                                                    setDistrictValue(
                                                        item.district,
                                                    );
                                                    setAddressValue(
                                                        `${item.district}, ${provinceValue}`,
                                                    );
                                                    setAddress(false);
                                                    setDistrict(false);
                                                }}
                                            >
                                                {item.district}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchByAddress;
