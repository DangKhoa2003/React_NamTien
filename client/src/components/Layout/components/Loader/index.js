import classNames from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = classNames.bind(styles);

function Loader() {
    return (
        <div className={cx('container', 'block-container')}>
            <div className={cx('loader')}>
                <div className={cx('waves')}></div>
            </div>
            <h1>Please wait a moment</h1>
        </div>
    );
}

export default Loader;
