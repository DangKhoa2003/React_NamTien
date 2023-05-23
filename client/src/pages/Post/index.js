import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import FileBase from 'react-file-base64';
import { FaReact } from 'react-icons/fa';
import { SiNamecheap } from 'react-icons/si';
import { BsThreeDots } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '~/actions/post';
import Loader from './../../components/Layout/components/Loader';
import Administration from '~/components/Layout/components/Administration';
const cx = classNames.bind(styles);

function Post() {
    const inputRef = useRef();
    const [currentId, setCurrentId] = useState(null);
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        image: '',
        auth: '',
    });
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        setCurrentId(null);
        setPostData({ title: '', description: '', auth: '' });
        inputRef.current.focus();
    };

    useEffect(() => {
        dispatch(getPosts());
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
                        <p className={cx('title')}>{currentId ? 'Update' : 'Create'} Post</p>
                        <span className={cx('subtitle')}>
                            Get started with our app, just create an account and enjoy the experience.
                        </span>
                    </div>
                    <br />
                    <div className={cx('input_container')}>
                        <label className={cx('input_label')} htmlFor="name_field">
                            Title
                        </label>
                        <SiNamecheap className={cx('icon')} />
                        <input
                            placeholder="Title"
                            title="Input title"
                            value={postData.title}
                            ref={inputRef}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                            name="input-name"
                            type="text"
                            className={cx('input_field')}
                            id="name_field"
                        />
                    </div>
                    <div className={cx('input_container')}>
                        <label className={cx('input_label')} htmlFor="password_field">
                            Desciption
                        </label>
                        <BiCategoryAlt className={cx('icon')} />
                        <input
                            placeholder="Desciption"
                            title="Input title"
                            name="input-name"
                            type="text"
                            value={postData.description}
                            onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                            className={cx('input_field')}
                            id="password_field"
                        />
                    </div>

                    <div className={cx('input_container')}>
                        <label className={cx('input_label')} htmlFor="auth_field">
                            Auth
                        </label>
                        <BiCategoryAlt className={cx('icon')} />
                        <input
                            placeholder="Author"
                            title="Input title"
                            name="input-name"
                            type="text"
                            value={postData.auth}
                            onChange={(e) => setPostData({ ...postData, auth: e.target.value })}
                            className={cx('input_field')}
                            id="auth_field"
                        />
                    </div>

                    <label htmlFor="file-input" className={cx('drop-container')}>
                        <span className={cx('drop-title')}>Drop files here</span>
                        or
                        <FileBase
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
                            type="file"
                            required=""
                            id="file-input"
                        />
                    </label>

                    <button title="Sign In" type="submit" className={cx('sign-in_apl')}>
                        <MdOutlineCreateNewFolder className={cx('iconCreate')} />
                        <span>{currentId ? 'Update' : 'Create'} Post</span>
                    </button>
                    <p className={cx('note')}>Terms of use &amp; Conditions</p>
                </form>
            </div>

            {!posts.length ? (
                <Loader />
            ) : (
                <div className={cx('container', 'product_container')}>
                    <div className="row pe-4">
                        {posts.map((post, index) => (
                            <div key={index} className={cx('col-lg-4', 'mt-5')}>
                                <div className={cx('productItem')}>
                                    <img src={post.image} alt="Img Prod" />
                                    <div className={cx('productItem__content')}>
                                        <h2>{post.title}</h2>
                                        <div className={cx('productItem__description')}>
                                            <span>
                                                <span style={{ fontWeight: '600' }}>Mô tả:</span> {post.description}
                                            </span>
                                            <span className={cx('mt-4')}>
                                                <span style={{ fontWeight: '600' }}>Tác giả:</span> {post.auth}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('productItem__action')}>
                                        <RiDeleteBin5Fill
                                            className={cx('productItem__action--icon')}
                                            onClick={() => dispatch(deletePost(post._id))}
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

export default Post;
