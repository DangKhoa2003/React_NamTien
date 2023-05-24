import classNames from 'classnames/bind';
import styles from './BackTop.module.scss';

import { RxPinTop } from 'react-icons/rx';
import { Fragment, useCallback, useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function BackTop() {
    const [showBtn, setShowBtn] = useState(false);
    const backToTop = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const handleScrollY = () => {
            setShowBtn(window.scrollY >= 600);
        };
        window.addEventListener('scroll', handleScrollY);
        return () => {
            window.removeEventListener('scroll', handleScrollY);
        };
    }, []);

    return (
        <Fragment>
            {showBtn && (
                <button id="back-top" onClick={backToTop} type="button" className={cx('backTop')}>
                    <RxPinTop className={cx('backTop-icon')} />
                </button>
            )}
        </Fragment>
    );
}

export default BackTop;
