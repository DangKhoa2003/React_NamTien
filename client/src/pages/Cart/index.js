import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import vietnam from '~/api/vietnam.json';
import { BiMinus } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Datepicker from 'react-tailwindcss-datepicker';
import { useForm } from 'react-hook-form';
import { memo, useEffect, useRef, useState } from 'react';
import Loader from '~/components/Layout/components/Loader';

const cx = classNames.bind(styles);
function Cart() {
    let cartsInLocal = JSON.parse(localStorage.getItem('cart'));
    const [quantity, setQuantity] = useState(1);
    const form = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const inputQuantity = useRef();
    const [cart, setCart] = useState([]);
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

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

    const onSubmit = (data) => {
        data.date = value;
        data.cart = cart;

        console.log(data);
    };

    useEffect(() => {
        if (cartsInLocal) {
            setCart(cartsInLocal.cartAr);
        }

        const cities = document.getElementById('city');
        const districts = document.getElementById('district');
        const wards = document.getElementById('ward');

        for (const x of vietnam) {
            cities.options[cities.options.length] = new Option(x.Name, x.Name);
        }

        // xứ lý khi thay đổi tỉnh thành thì sẽ hiển thị ra quận huyện thuộc tỉnh thành đó
        cities.onchange = function () {
            districts.length = 1;
            wards.length = 1;
            if (this.value !== '') {
                const result = vietnam.filter((n) => n.Name === this.value);

                for (const k of result[0].Districts) {
                    districts.options[districts.options.length] = new Option(k.Name, k.Name);
                }
            }
        };

        districts.onchange = function () {
            wards.length = 1;
            const dataCity = vietnam.filter((n) => n.Name === cities.value);
            if (this.value !== '') {
                const dataWards = dataCity[0].Districts.filter((n) => n.Name === this.value)[0].Wards;

                for (const w of dataWards) {
                    wards.options[wards.options.length] = new Option(w.Name, w.Name);
                }
            }
        };
    }, []);

    useEffect(() => {
        if (cart.length >= 0) {
            localStorage.setItem('cart', JSON.stringify({ cartAr: cart }));
        }
    }, [cart]);

    return (
        <section className={cx('bg_dark')}>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col l-6')}>
                            <fieldset>
                                <legend className={cx('title_cart')}>Delivery Information</legend>
                                <div className={cx('cart-list')}>
                                    <div className={cx('formInfo')}>
                                        <div className={cx('input-container-parents')}>
                                            <div className={cx('input-container')}>
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    {...register('name', { required: 'This is required.' })}
                                                    placeholder="Bryan Cranston"
                                                />
                                                <p className="text-danger">{errors.name?.message}</p>
                                            </div>

                                            <div className={cx('input-container')}>
                                                <label htmlFor="mobile">Mobile Number</label>
                                                <input
                                                    type="text"
                                                    id="mobile"
                                                    {...register('mobile', {
                                                        required: 'This is required.',
                                                        minLength: {
                                                            value: 10,
                                                            message: 'Số điện thoại tối thiểu 10 số',
                                                        },
                                                    })}
                                                    placeholder="+84 424-236-3574"
                                                />
                                                <p className="text-danger">{errors.mobile?.message}</p>
                                            </div>
                                        </div>

                                        <div className={cx('input-container-parents')}>
                                            <div className={cx('input-container')}>
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    {...register('email', {
                                                        required: 'This is required.',
                                                        pattern: {
                                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                            message: 'Trường này phải là Email',
                                                        },
                                                    })}
                                                    placeholder="abc@gmail.com"
                                                />
                                                <p className="text-danger">{errors.email?.message}</p>
                                            </div>

                                            <div className={cx('input-container')}>
                                                <label htmlFor="city">City</label>
                                                <select
                                                    id="city"
                                                    defaultValue={''}
                                                    {...register('city', { required: 'This is required.' })}
                                                >
                                                    <option value="" disabled>
                                                        Chọn tỉnh thành
                                                    </option>
                                                </select>
                                                <p className="text-danger">{errors.city?.message}</p>
                                            </div>
                                        </div>

                                        <div className={cx('input-container-parents')}>
                                            <div className={cx('input-container')}>
                                                <label htmlFor="district">District</label>
                                                <select
                                                    id="district"
                                                    defaultValue={''}
                                                    {...register('district', { required: 'This is required.' })}
                                                >
                                                    <option value="" disabled>
                                                        Chọn quận huyện
                                                    </option>
                                                </select>
                                                <p className="text-danger">{errors.district?.message}</p>
                                            </div>

                                            <div className={cx('input-container')}>
                                                <label htmlFor="ward">Ward</label>
                                                <select
                                                    id="ward"
                                                    {...register('ward', {
                                                        required: 'This is required.',
                                                    })}
                                                    defaultValue={''}
                                                >
                                                    <option value="" disabled>
                                                        Chọn phường xã
                                                    </option>
                                                </select>
                                                <p className="text-danger">{errors.ward?.message}</p>
                                            </div>
                                        </div>

                                        <div className={cx('input-container__inline')}>
                                            <label htmlFor="address">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                {...register('address', { required: 'This is required.' })}
                                                placeholder="12 Trinh Dinh Thao Street"
                                            />
                                            <p className="text-danger">{errors.address?.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className={cx('title_cart')}>Schedule Delivery</legend>
                                <div className={cx('cart-list')}>
                                    <div className={cx('formInfo')}>
                                        <div className={cx('input-container__inline')}>
                                            <label htmlFor="date">Date</label>
                                            <Datepicker
                                                id="date"
                                                primaryColor={'indigo'}
                                                useRange={false}
                                                value={value}
                                                onChange={handleValueChange}
                                                displayFormat={'DD/MM/YYYY'}
                                            />
                                        </div>

                                        <div className={cx('input-container__inline')}>
                                            <label htmlFor="note">Note</label>
                                            <input
                                                {...register('note')}
                                                type="text"
                                                id="note"
                                                name="note"
                                                placeholder="Type your note"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className={cx('title_cart')}>Support Method</legend>
                                <div className={cx('cart-list')}>
                                    <div className={cx('formRadio')}>
                                        <label className={cx('label')} htmlFor="alien">
                                            <input
                                                id="alien"
                                                {...register('support')}
                                                value="no"
                                                type="radio"
                                                name="support"
                                            />
                                            <div className={cx('buttonRadio')}>
                                                <span className={cx('shadow')}></span>
                                                <span className={cx('edge')}></span>
                                            </div>

                                            <span className={cx('radioText')}>Tự Gia Công</span>
                                        </label>
                                        <label className={cx('label')} htmlFor="bear">
                                            <input
                                                id="bear"
                                                value="yes"
                                                {...register('support')}
                                                type="radio"
                                                name="support"
                                                defaultChecked={true}
                                            />
                                            <div className={cx('buttonRadio')}>
                                                <span className={cx('shadow')}></span>
                                                <span className={cx('edge')}></span>
                                            </div>

                                            <span className={cx('radioText')}>Hỗ Trợ Gia Công</span>
                                        </label>
                                        <label className={cx('label')} htmlFor="mickey">
                                            <input
                                                id="mickey"
                                                {...register('support')}
                                                value="other"
                                                type="radio"
                                                name="support"
                                            />
                                            <div className={cx('buttonRadio')}>
                                                <span className={cx('shadow')}></span>
                                                <span className={cx('edge')}></span>
                                            </div>

                                            <span className={cx('radioText')}>Nhu cầu khác</span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div className={cx('col l-6')}>
                            <fieldset className={cx('cart-fieldset')}>
                                <legend className={cx('title_cart')}>Order Summary</legend>
                                <div className={cx('cart_description')}>
                                    <div className={cx('cart-list', 'tooLong')}>
                                        {cart.length === 0 ? (
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
                                                                value={item.quantity || 1}
                                                                onChange={(e) => setQuantity(e.target.value)}
                                                            />
                                                            <button
                                                                onClick={() => increaseQuantity(item._id)}
                                                                type="button"
                                                            >
                                                                <BsPlusLg />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <button className={cx('cart_description-submit')} type="submit">
                                        Confirm Order
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default memo(Cart);
