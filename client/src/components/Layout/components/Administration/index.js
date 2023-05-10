import classNames from 'classnames/bind';
import styles from './Administration.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Administration() {
    return (
        <div className={cx('block_section', 'container')}>
            <ul className={cx('d-flex', 'justify-content-center', 'controller_list', 'row')}>
                <li>
                    <Link className={cx('controller_item')} to={'/newProduct'}>
                        Quản lý sản phẩm
                    </Link>
                </li>

                <li>
                    <Link className={cx('controller_item')} to={'/banner'}>
                        Quản lý banner
                    </Link>
                </li>

                <li>
                    <Link className={cx('controller_item')} to={'/post'}>
                        Quản lý bài viết
                    </Link>
                </li>

                <li>
                    <Link className={cx('controller_item')} to={'/company'}>
                        Quản lý đối tác
                    </Link>
                </li>

                <li>
                    <Link className={cx('controller_item')} to={'/videoYT'}>
                        Quản lý video
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Administration;
