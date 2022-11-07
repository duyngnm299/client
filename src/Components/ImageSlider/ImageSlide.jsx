import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import styles from './ImageSlider.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
const delay = 3000;
const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrentIndex((prevIndex) =>
                    prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
                ),
            delay,
        );

        return () => {
            resetTimeout();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
        backgroundImage: `url(${slides[currentIndex].url})`,
    };

    return (
        <div className={cx('slider-wrapper')}>
            <div className="arrow-container">
                <div onClick={goToPrevious} className={cx('left-arrow')}>
                    <MdKeyboardArrowLeft />
                </div>
                <div onClick={goToNext} className={cx('right-arrow')}>
                    <MdKeyboardArrowRight />
                </div>
            </div>
            <div
                style={slideStylesWidthBackground}
                className={cx('slider-show')}
            ></div>
            <div className={cx('dots-container')}>
                {slides.map((slide, slideIndex) => (
                    <div
                        className={cx('dot')}
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        ●
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
