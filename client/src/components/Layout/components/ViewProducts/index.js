import classNames from 'classnames/bind';
import styles from './ViewProducts.module.scss';
import Product from '../Product';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '~/actions/products';
import Loader from '../Loader';
const cx = classNames.bind(styles);
function ViewProducts({ title, bg }) {
    const [results, setResult] = useState([]);
    // Define a state variable to store the result
    const [currentId, setCurrentId] = useState(null);
    // Set the result whenever the title changes
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProducts());
    }, [currentId, dispatch]);

    useEffect(() => {
        if (title === 'Sắt Mỹ Thuật') {
            return setResult(posts.filter((prod) => prod.category === 'Sắt Mỹ Thuật'));
        } else if (title === 'Cầu Thang Sắt') {
            return setResult(posts.filter((prod) => prod.category === 'Cầu Thang Sắt'));
        } else if (title === 'Hàng Rào') {
            return setResult(posts.filter((prod) => prod.category === 'Hàng Rào'));
        } else if(title === 'Mái Tôn') {
            return setResult(posts.filter((prod) => prod.category === 'Mái Tôn'));
        } else if(title === 'Vách Ngăn') {
            return setResult(posts.filter((prod) => prod.category === 'Vách Ngăn'));
        } else if (title === 'Cửa Nhôm') {
            return setResult(posts.filter((prod) => prod.category === 'Cửa Nhôm'));
        }
    }, [title, posts]);
    return (
        <section className={cx('block_section')} style={{ backgroundColor: `${bg}` }}>
            <h1 className={cx('aboutTitle')}>
                {title}
                <div className={cx('aboutTitle_space')}></div>
            </h1>
            <div className="container my-5">
                <div className="row">
                    {!results.length
                        ? <Loader/>
                        : results.map((prod, index) => (
                              <Product key={index} prod={prod} currentId={currentId} setCurrentId={setCurrentId} />
                          ))}
                </div>
            </div>

            <div className={cx('d-flex', 'justify-content-center')}>
                <Button />
            </div>
        </section>
    );
}

export default ViewProducts;
