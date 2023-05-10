import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import { useState } from 'react';
import BackTop from '../components/BackTop';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [toast, setToast] = useState({});
    const handleChildClick = (value) => {
        setToast(value);
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Alert toast={toast} />
            <div className={cx('content')}>
                {children}
            </div>
            <BackTop />
            <Footer onClick={handleChildClick} />
        </div>
    );
}

export default DefaultLayout;
