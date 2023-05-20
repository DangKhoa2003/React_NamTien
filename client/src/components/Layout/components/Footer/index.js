import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import emailjs from '@emailjs/browser';
import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OwlCarousel from 'react-owl-carousel';
import { RiUser3Fill } from 'react-icons/ri';
import { IoIosCall } from 'react-icons/io';

import { getCompanies } from '~/actions/company';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Loader from '../Loader';
const cx = classNames.bind(styles);
function Footer(toast) {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies);
    useEffect(() => {
        dispatch(getCompanies());
    }, [dispatch]);

    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        const inputName = document.querySelector('input[name="from_name"]');
        emailjs.sendForm('service_30bcebk', 'template_vluks1i', form.current, 'MzT80ePry9ki_G-Il').then(
            (result) => {
                console.log(result.text);

                toast.onClick({
                    title: 'Thành công',
                    message: 'Đã gửi lời nhắn của bạn thành công !!!',
                    type: 'success',
                    duration: 3000,
                });
            },
            (error) => {
                console.log(error.text);
                toast.onClick({
                    title: 'Thất bại',
                    message: 'Có lỗi xảy ra vui lòng thử lại',
                    type: 'error',
                    duration: 3000,
                });
            },
        );

        inputName.value = '';
        document.querySelector('input[name="from_phone"]').value = '';
        inputName.focus();
    };

    return (
        <Fragment>
            <section className={cx('container', 'block_partner')}>
                <h1 className={cx('partnerTitle', 'text-center')}>
                    Đối Tác
                    <div className={cx('partnerTitle_space', 'text-center')}></div>
                </h1>
                <div className={cx('grid', 'wide', 'mt-5', 'partnerCompany')}>
                    <div className={cx('row')}>
                        {!companies.length ? (
                            <Loader />
                        ) : (
                            companies.map((company, index) => (
                                <div
                                    key={index}
                                    className={cx(
                                        'l-2-4',
                                        'c-6',
                                        'my-5',
                                        'md-6',
                                        'col',
                                        'd-flex',
                                        'justify-content-center',
                                        'company',
                                    )}
                                >
                                    <img src={company.image} alt="Company" />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <OwlCarousel
                    className={cx('owl-theme', 'company_mobile--container')}
                    autoplayHoverPause={true}
                    rewind={true}
                    autoplay={true}
                    autoplayTimeout={2000}
                    center={true}
                    items={3}
                    loop
                    margin={10}
                    nav={false}
                    dots={false}
                >
                    {!companies.length ? (
                        <Loader />
                    ) : (
                        companies.map((company, index) => (
                            <div
                                key={index}
                                className={cx('my-5', 'd-flex', 'justify-content-center', 'company_mobile')}
                            >
                                <img src={company.image} alt="Company" />
                            </div>
                        ))
                    )}
                </OwlCarousel>

                <section className={cx('container', 'form_advise', 'd-flex', 'flex-column', 'align-items-center')}>
                    <h1 className={cx('partnerTitle', 'text-center')}>
                        ĐĂNG KÝ TƯ VẤN
                        <div className={cx('partnerTitle_space', 'text-center')}></div>
                    </h1>
                    <p className={cx('text-center')}>
                        Xin vui lòng để lại Họ - Tên và số điện thoại, chúng tôi sẽ cập nhật những sản phẩm mới nhất của
                        chúng tôi đến với bạn
                    </p>
                    <form action="" className={cx('form_advise-tagForm')} ref={form} onSubmit={sendEmail}>
                        <div className={cx('form_advise-input', 'w-50')}>
                            <RiUser3Fill />
                            <input type="text" name="from_name" id="" placeholder="Họ tên" />
                        </div>

                        <div className={cx('form_advise-input', 'w-50')}>
                            <IoIosCall />
                            <input type="text" required name="from_phone" id="" placeholder="Số điện thoại" />
                        </div>
                        <button className={cx('form_advise-btn')} type="submit">
                            Đăng Ký
                        </button>
                    </form>
                </section>
            </section>

            <section className={cx('block_section')}>
                <div className={cx('grid', 'wide', 'footer_content')}>
                    <div className={cx('row')}>
                        <div
                            className={cx(
                                'col',
                                'l-3',
                                'c-12',
                                'md-6',
                                'd-flex',
                                'flex-column',
                                'justify-content-center',
                                'footer_info',
                            )}
                        >
                            <h1>Công ty cơ khí Nam Tiến</h1>

                            <div className={cx('footer_info--div')}>
                                <h3>Địa chỉ: Bình Dương</h3>
                                <h3>Mã số thuế: 031 737 5921</h3>
                                <h3>Số điện thoại: 0938.999.999</h3>
                                <h3>Email: cokhinamtien@gmail.com</h3>
                            </div>
                        </div>

                        <div
                            className={cx(
                                'col',
                                'l-2',
                                'md-6',
                                'c-12',
                                'd-flex',
                                'flex-column',
                                'justify-content-center',
                                'footer_info',
                            )}
                        >
                            <h1>Dịch vụ</h1>

                            <div className={cx('footer_info--div')}>
                                <h3>Dịch vụ loại 1</h3>
                                <h3>Dịch vụ loại 2</h3>
                                <h3>Dịch vụ loại 3</h3>
                                <h3>Dịch vụ loại 4</h3>
                            </div>
                        </div>

                        <div
                            className={cx(
                                'col',
                                'l-2',
                                'md-6',
                                'c-12',
                                'd-flex',
                                'flex-column',
                                'justify-content-center',
                                'footer_info',
                            )}
                        >
                            <h1>Dịch Vụ</h1>

                            <div className={cx('footer_info--div')}>
                                <h3>Dịch vụ loại 1</h3>
                                <h3>Dịch vụ loại 2</h3>
                                <h3>Dịch vụ loại 3</h3>
                                <h3>Dịch vụ loại 4</h3>
                            </div>
                        </div>

                        <div
                            className={cx(
                                'col',
                                'l-2',
                                'md-6',
                                'c-12',
                                'd-flex',
                                'flex-column',
                                'justify-content-center',
                                'footer_info',
                            )}
                        >
                            <h1>Dịch vụ</h1>

                            <div className={cx('footer_info--div')}>
                                <h3>Dịch vụ loại 1</h3>
                                <h3>Dịch vụ loại 2</h3>
                                <h3>Dịch vụ loại 3</h3>
                                <h3>Dịch vụ loại 4</h3>
                            </div>
                        </div>

                        <div
                            className={cx(
                                'col',
                                'l-3',
                                'md-6',
                                'c-12',
                                'd-flex',
                                'flex-column',
                                'justify-content-center',
                                'footer_info',
                            )}
                        >
                            <h1>FANPAGE</h1>

                            <div className={cx('footer_info--div')}>
                                <a className='d-flex' href="https://www.facebook.com/tranhadangkhoa">
                                    <img
                                        className={cx('footer-fanpage')}
                                        src={require('~/assets/img/Fanpage.png')}
                                        alt="Fanpage"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx('footer_Copyright', 'py-3')}>
                <p>Copyright &copy; {new Date().getFullYear()} CƠ KHÍ NAM TIẾN. All rights reserved.</p>
            </section>
        </Fragment>
    );
}

export default Footer;
