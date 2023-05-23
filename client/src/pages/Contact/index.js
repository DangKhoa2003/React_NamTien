import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

const cx = classNames.bind(styles);
function Contact() {
    const form = useRef();
    const MySwal = withReactContent(Swal);
    const sendEmail = (e) => {
        e.preventDefault();
        const inputName = document.querySelector('input[name="first-name"]');
        emailjs.sendForm('service_30bcebk', 'template_k5uqrb5', form.current, 'MzT80ePry9ki_G-Il').then(
            (result) => {
                console.log(result.text);
                MySwal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Đã gửi lời nhắn của bạn thành công !!!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            (error) => {
                console.log(error.text);
                MySwal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Có lỗi xảy ra vui lòng thử lại',
                    showConfirmButton: false,
                    background: '#ff623d',
                    timer: 3000,
                });
            },
        );

        inputName.value = '';
        document.querySelector('input[name="last-name"]').value = '';
        document.querySelector('input[name="email"]').value = '';
        document.querySelector('input[name="mobile"]').value = '';
        document.querySelector('textarea[name="message"]').value = '';
        inputName.focus();
    };
    return (
        <section className={cx('container', 'wrapper')}>
            <div className={cx('row', 'customPd-5')}>
                <div className={cx('col-lg-5', 'col-md-12', 'col-sm-12', 'contact-us')}>
                    <h1 className={cx('title')}>Contact us</h1>
                    <p>Our friendly team would love to hear from you!</p>
                    <form className={cx('form_contactUs')} ref={form} onSubmit={sendEmail}>
                        <div className={cx('input-container-parents')}>
                            <div className={cx('input-container')}>
                                <label htmlFor="first-name">First name</label>
                                <input type="text" id="first-name" name="first-name" placeholder="First name" />
                            </div>

                            <div className={cx('input-container')}>
                                <label htmlFor="last-name">Last name</label>
                                <input type="text" id="last-name" name="last-name" placeholder="Last name" />
                            </div>
                        </div>

                        <div className={cx('input-container__inline')}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="you@gmail.com" />
                        </div>

                        <div className={cx('input-container__inline')}>
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" id="mobile" name="mobile" placeholder="+84 914368621" />
                        </div>

                        <div className={cx('input-container__inline')}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                rows="4"
                                id="message"
                                name="message"
                                className={cx('form_contactUs--message')}
                            ></textarea>
                        </div>

                        <button className={cx('form-btnSubmit')} type="submit">
                            Send message
                        </button>
                    </form>
                </div>
                <div className={cx('col-lg-7', 'col-md-12', 'col-sm-12', 'google-map')}>
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.871764571567!2d106.63602487399997!3d10.821124289330394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175296509440ab9%3A0xc77c42a99a4c5a0e!2zMzM3IFBo4bqhbSBWxINuIELhuqFjaCwgUGjGsOG7nW5nIDE1LCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1683277021351!5m2!1svi!2s"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}

export default Contact;
