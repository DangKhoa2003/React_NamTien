import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { BsArrowRight } from 'react-icons/bs';


const cx = classNames.bind(styles);
function Button() {
    return <button className={cx('btn', 'btn-primary', 'mt-5')}>
        Tìm hiểu thêm
        <BsArrowRight className={cx('ms-3')}/>
    </button>;
}

export default Button;
