import classNames from 'classnames/bind';
import styles from './Alert.module.scss';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);
function Alert({ toast }) {
    const toastElement = useRef();
    useEffect(() => {
        const timer = setTimeout(function () {
            if (toastElement.current.classList.contains('active')) {
                toastElement.current.classList.remove('active');
                toast.type = '';
            }
        }, toast.duration);

        return () => clearTimeout(timer);
    }, [toast]);

    useEffect(() => {
        if (toast.type === 'success' || toast.type === 'error') {
            toastElement.current.classList.add('active');
        }
    }, [toast]);
    return (
        <div
            ref={toastElement}
            className={cx(
                'success-block',
                'submit-alert',
                toast === {} || toast.type === 'success' ? 'toast--success' : 'toast--error',
            )}
        >
            {toast.type === 'success' ? (
                <AiOutlineCheckCircle className={cx('alert-icon')} />
            ) : (
                <BiErrorCircle className={cx('alert-icon')} />
            )}
            <span className={cx('alert-span')}>
                {toast.message || 'Đã gửi lời nhắn của bạn thành công !!!'}
            </span>
        </div>
    );
}

export default Alert;
