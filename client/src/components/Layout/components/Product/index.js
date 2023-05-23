import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { FiPhoneCall } from 'react-icons/fi';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { likeProduct } from '~/actions/products';
import { buyProduct } from '~/actions/cart';

const cx = classNames.bind(styles);
function Product({ prod }) {
    const iconHeartRef = useRef();
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    let carts = useSelector((state) => state.cartReducer);
    let cartsInLocal = JSON.parse(localStorage.getItem('cart'));
    const toggleHeart = function () {
        if (iconHeartRef.current.classList.contains('active')) {
            iconHeartRef.current.classList.remove('active');
        } else {
            iconHeartRef.current.classList.add('active');
        }
    };

    const contactProduct = () => {
        dispatch(buyProduct(prod));
        MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm sản phẩm thành công ❤️',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    useEffect(() => {
        if (carts.cartAr !== cartsInLocal.cartAr) {
            carts.cartAr = cartsInLocal.cartAr;
        }
    }, []);

    useEffect(() => {
        if (carts.cartAr.length > 0) {
            localStorage.setItem('cart', JSON.stringify(carts));
        }
    }, [carts]);

    return (
        <div className={cx('col-lg-3', 'product', 'col-md-6', 'col-sm-12')}>
            <div className={cx('product_div')}>
                <img className={cx('product-img')} src={prod.selectedFile} alt="Slider 1" />
                <p className={cx('product_div--p')}>{prod.title}</p>
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

                        <button onClick={contactProduct} className={cx('product__allButtons-buy')}>
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
