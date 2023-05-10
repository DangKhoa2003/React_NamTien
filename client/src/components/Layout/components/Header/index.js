import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { MdOutlineCall } from 'react-icons/md';
import { ImHome } from 'react-icons/im';
import { FaCircle } from 'react-icons/fa';
import { AiOutlineBars } from 'react-icons/ai';
import { useRef } from 'react';
const cx = classNames.bind(styles);

function Header() {
    const closeRef = useRef();
    const admin = localStorage.getItem('accountAdmin');

    const handleRemoveAdmin = () => {
        localStorage.removeItem('accountAdmin');
    };

    const handleClose = () => {
        const collapse = document.querySelector('.collapse');
        if (collapse.classList.contains('show')) {
            collapse.classList.remove('show');
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('bulkhead')}></div>

            <div className={cx('site-mobile-menu', 'site-navbar-target')}>
                <div className={cx('site-mobile-menu-header', 'd-flex', 'justify-content-between')}>
                    <div className={cx('site-mobile-menu-close')}>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarToggleExternalContent"
                            aria-controls="navbarToggleExternalContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <AiOutlineBars className={cx('js-menu-toggle')} />
                        </button>
                    </div>

                    <img src={require('~/assets/img/logocokhi-namtien.png')} alt="Logo" />

                    <div className={cx('site-mobile-menu-close')}>
                        <span ref={closeRef} onClick={handleClose} className={cx('js-menu-toggle')}>
                            &#10006;
                        </span>
                    </div>
                </div>
                <div className={cx('site-mobile-menu-body')} id="navbarToggleExternalContent">
                    <ul
                        className={cx(
                            'd-flex',
                            'justify-content-between',
                            'flex-column',
                            'py-4',
                            'align-items-center',
                            'mobile-menu__list',
                        )}
                    >
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/iron">Sắt Mỹ Thuật</Link>
                        </li>
                        <li>
                            <Link to="/stair">Cầu Thang Sắt</Link>
                        </li>
                        <li>
                            <Link to="/fence">Hàng Rào</Link>
                        </li>
                        <li>
                            <Link to="/roof">Mái Tôn</Link>
                        </li>
                        <li>
                            <Link to="/bulkhead">Vách Ngăn</Link>
                        </li>
                        <li>
                            <Link to="/aluminumDoor">Cửa Nhôm</Link>
                        </li>
                        <li>
                            <Link to="/contact">Liên Hệ</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx('header_navbar', 'container', 'py-4', 'header_moble-menu')}>
                <div className="d-flex justify-content-between">
                    <nav className={cx('header_nav')}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <MdOutlineCall className={cx('header_iconCall')} />
                                <span>0938.999.999</span>
                            </div>

                            <h4>
                                <Link to={admin ? '/newProduct' : '/admin'}>Admin</Link>
                            </h4>

                            {admin && (
                                <h4>
                                    <a onClick={handleRemoveAdmin} href='/'>
                                        Log out
                                    </a>
                                </h4>
                            )}
                        </div>
                        <ul className={cx('header_list')}>
                            <li className={cx('header_item')}>
                                <Link to="/">
                                    <ImHome className={cx('header_item-icon')} />
                                </Link>
                            </li>
                            <li className={cx('header_item')}>
                                <Link to="/iron">Sắt Mỹ Thuật</Link>
                            </li>
                            <li className={cx('header_item')}>
                                <Link to="/stair">Cầu Thang Sắt</Link>
                            </li>
                            <li className={cx('header_item')}>
                                <Link to="/fence">Hàng Rào</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header_logo">
                        <img src={require('~/assets/img/logocokhi-namtien.png')} alt="Logo" />
                    </div>
                    <nav className={cx('header_nav')}>
                        <div className="d-flex align-items-center justify-content-around">
                            <input className={cx('header_input')} type="text" placeholder="Tìm kiếm..." />
                            <div>
                                <FaCircle className={cx('header_iconCircle')} />
                                <span>BẠN TƯ VẤN</span>
                            </div>
                        </div>
                        <ul className={cx('header_list')}>
                            <li className={cx('header_item')}>
                                <Link to="/roof">Mái Tôn</Link>
                            </li>
                            <li className={cx('header_item')}>
                                <Link to="/bulkhead">Vách Ngăn</Link>
                            </li>
                            <li className={cx('header_item')}>
                                <Link to="/aluminumDoor">Cửa Nhôm</Link>
                            </li>
                            <li className={cx('header_item')}>
                                <Link to="/contact">Liên Hệ</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
