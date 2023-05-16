import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import { BiMinus } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo, useEffect, useRef, useState } from 'react';
import Loader from '~/components/Layout/components/Loader';

const cx = classNames.bind(styles);
function Cart() {
    let cartsInLocal = JSON.parse(localStorage.getItem('cart'));
    const [quantity, setQuantity] = useState(1);
    const inputQuantity = useRef();
    const [cart, setCart] = useState([]);
    const deleteCart = (id) => {
        return setCart(cart.filter((item) => item._id !== id));
    };

    const ebbQuantity = (id) => {
        const index = cart.findIndex((obj) => obj._id === id);
        if (cart[index].quantity === undefined || cart[index].quantity === 1) {
            cart[index].quantity = 1;
            setQuantity(cart[index].quantity);
            localStorage.setItem('cart', JSON.stringify({ cartAr: cart }));
        } else {
            cart[index].quantity -= 1;
            setQuantity(cart[index].quantity);
            localStorage.setItem('cart', JSON.stringify({ cartAr: cart }));
        }
    };

    const increaseQuantity = (id) => {
        const index = cart.findIndex((obj) => obj._id === id);
        if (cart[index].quantity === undefined) {
            cart[index].quantity = 2;
            setQuantity(cart[index].quantity);
            localStorage.setItem('cart', JSON.stringify({ cartAr: cart }));
        } else {
            cart[index].quantity += 1;
            setQuantity(cart[index].quantity);
            localStorage.setItem('cart', JSON.stringify({ cartAr: cart }));
            
        }
    };

    useEffect(() => {
        if (cartsInLocal) {
            setCart(cartsInLocal.cartAr);
        }
    }, []);

    useEffect(() => {
        if (cart.length >= 0) {
            localStorage.setItem('cart', JSON.stringify({ cartAr: cart }));
        }
    }, [cart]);

    return (
        <section className={cx('bg_dark')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col l-6')}></div>
                    <div className={cx('col l-6')}>
                        <h1 className={cx('title_cart')}>Order Summary</h1>
                        <div className={cx('cart-list')}>
                            {cart === true ? (
                                <Loader />
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className={cx('cart-item')}>
                                        <div className={cx('cart-item_left')}>
                                            <img
                                                src={item.selectedFile}
                                                alt="Product"
                                                className={cx('cart-item_img')}
                                            />
                                            <div className={cx('cart-item_info')}>
                                                <h2>{item.title}</h2>
                                                <span>{item.category}</span>
                                                <p>Giá: Thương lượng</p>
                                            </div>
                                        </div>

                                        <div className={cx('cart-item_right')}>
                                            <div>
                                                <AiOutlineCloseCircle
                                                    onClick={() => deleteCart(item._id)}
                                                    className={cx('delete-product')}
                                                />
                                            </div>

                                            <div className={cx('cart-item_quantity')}>
                                                <button onClick={() => ebbQuantity(item._id)} type="button">
                                                    <BiMinus />
                                                </button>
                                                <input
                                                    type="text"
                                                    name="quantity"
                                                    ref={inputQuantity}
                                                    value={item.quantity || quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                                <button onClick={() => increaseQuantity(item._id)} type="button">
                                                    <BsPlusLg />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(Cart);
