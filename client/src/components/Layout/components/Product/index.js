import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { FiPhoneCall } from 'react-icons/fi';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { likeProduct } from '~/actions/products';

const cx = classNames.bind(styles);
function Product({ prod }) {
    const iconHeartRef = useRef();
    const toggleHeart = function () {
        if (iconHeartRef.current.classList.contains('active')) {
            iconHeartRef.current.classList.remove('active');
        } else {
            iconHeartRef.current.classList.add('active');
        }
    };

    const dispatch = useDispatch();

    return (
        <div className={cx('col-lg-3', 'product', 'col-md-6', 'col-sm-12')}>
            <div className={cx('product_div')}>
                <img className={cx('product-img')} src={prod.selectedFile} alt="Slider 1" />
                <p className={cx('product_div--p')}>
                    {prod.title}
                </p>
                <div className={cx('d-flex', 'justify-content-center')}>
                    <div className={cx('product__allButtons')}>
                        <div className={cx('product__content--love')}>
                            <button
                                className={cx('product__allButtons-favourite', 'btnFavourite')}
                                onClick={toggleHeart}
                                ref={iconHeartRef}
                            >
                                <BsFillSuitHeartFill
                                    className={cx('icon-heart')}
                                    onClick={() => dispatch(likeProduct(prod._id))}
                                />
                            </button>
                            <span>{prod.likeCount}</span>
                        </div>

                        <button className={cx('product__allButtons-buy')}>
                            <FiPhoneCall />
                            Liên Hệ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
