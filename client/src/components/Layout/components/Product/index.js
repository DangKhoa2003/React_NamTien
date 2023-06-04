import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { FiPhoneCall } from 'react-icons/fi';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { likeProduct } from '~/actions/products';
import { buyProduct } from '~/actions/cart';

const cx = classNames.bind(styles);
function Product({ prod }) {
    const [carts] = useState({ cartAr: [] });
    let cartsInLocal = JSON.parse(localStorage.getItem('cart'));
    const iconHeartRef = useRef();
    const dispatch = useDispatch();
    let cartReducer = useSelector((state) => state.cartReducer);
    const MySwal = withReactContent(Swal);
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
        localStorage.setItem('cart', JSON.stringify(cartReducer));
    }, [cartReducer, carts]);

    useEffect(() => {
        if (cartReducer === null || cartsInLocal === null) {
            cartReducer = carts;
            cartsInLocal = carts;
        }
        if (cartReducer.cartAr !== cartsInLocal.cartAr) {
            cartReducer.cartAr = cartsInLocal.cartAr;
        }
    }, []);
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
