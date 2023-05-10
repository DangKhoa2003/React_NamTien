import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
import FileBase from 'react-file-base64';
import { FaReact } from 'react-icons/fa';
import { SiNamecheap } from 'react-icons/si';
import { BsThreeDots } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '~/actions/products';
import Loader from './../../components/Layout/components/Loader';
import Administration from '~/components/Layout/components/Administration';
const cx = classNames.bind(styles);

function NewProduct() {
    const inputRef = useRef();
    const [currentId, setCurrentId] = useState(null);
    const [productData, setProductData] = useState({
        title: '',
        category: '',
        likeCount: 0,
        selectedFile: '',
    });
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.products);
    const post = useSelector((state) => (currentId ? state.products.find((p) => p._id === currentId) : null));

    useEffect(() => {
        if (post) setProductData(post);
    }, [post]);
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (currentId) {
            dispatch(updateProduct(currentId, productData));
        } else {
            dispatch(createProduct(productData));
        }

        setCurrentId(null);
        setProductData({ title: '', category: '' });
        inputRef.current.focus();
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [currentId, dispatch]);
    return (
        <section className={cx('newProduct')}>
            <Administration />

            <div className={cx('outBg', 'container')}>
                <form className={cx('form_container')} onSubmit={handleSubmit}>
                    <div className={cx('logo_container')}>
                        <FaReact className={cx('logo_container--icon')} />
                    </div>

                    <div className={cx('title_container')}>
                        <p className={cx('title')}>{currentId ? 'Update' : 'Create'} Product</p>
                        <span className={cx('subtitle')}>
                            Get started with our app, just create an account and enjoy the experience.
                        </span>
                    </div>
                    <br />
                    <div className={cx('input_container')}>
                        <label className={cx('input_label')} htmlFor="name_field">
                            Name
                        </label>
                        <SiNamecheap className={cx('icon')} />
                        <input
                            placeholder="Product's name"
                            title="Input title"
                            value={productData.title}
                            ref={inputRef}
                            onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                            name="input-name"
                            type="text"
                            className={cx('input_field')}
                            id="name_field"
                        />
                    </div>
                    <div className={cx('input_container')}>
                        <label className={cx('input_label')} htmlFor="password_field">
                            Category
                        </label>
                        <BiCategoryAlt className={cx('icon')} />
                        <input
                            placeholder="Product Category"
                            title="Inpit title"
                            name="input-name"
                            type="text"
                            value={productData.category}
                            onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                            className={cx('input_field')}
                            id="password_field"
                        />
                    </div>

                    <label htmlFor="file-input" className={cx('drop-container')}>
                        <span className={cx('drop-title')}>Drop files here</span>
                        or
                        <FileBase
                            multiple={false}
                            onDone={({ base64 }) => setProductData({ ...productData, selectedFile: base64 })}
                            type="file"
                            required=""
                            id="file-input"
                        />
                    </label>

                    <button title="Sign In" type="submit" className={cx('sign-in_apl')}>
                        <MdOutlineCreateNewFolder className={cx('iconCreate')} />
                        <span>{currentId ? 'Update' : 'Create'} Product</span>
                    </button>
                    <p className={cx('note')}>Terms of use &amp; Conditions</p>
                </form>
            </div>

            {!posts.length ? (
                <Loader />
            ) : (
                <div className={cx('container', 'product_container')}>
                    <div className="row">
                        {posts.map((post, index) => (
                            <div key={index} className={cx('col-lg-4', 'mt-5')}>
                                <div className={cx('productItem')}>
                                    <img src={post.selectedFile} alt="Img Prod" />
                                    <div className={cx('productItem__content')}>
                                        <h2>{post.title}</h2>
                                        <div className={cx('productItem__description')}>
                                            <span>Category: {post.category}</span>
                                            <span>Love Count: {post.likeCount}</span>
                                        </div>
                                    </div>
                                    <div className={cx('productItem__action')}>
                                        <RiDeleteBin5Fill
                                            className={cx('productItem__action--icon')}
                                            onClick={() => dispatch(deleteProduct(post._id))}
                                        />
                                        <BsThreeDots
                                            className={cx('productItem__action--icon')}
                                            onClick={() => setCurrentId(post._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default NewProduct;
