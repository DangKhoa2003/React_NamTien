import classNames from 'classnames/bind';
import styles from './VideoYT.module.scss';
import { FaReact } from 'react-icons/fa';
import { SiNamecheap } from 'react-icons/si';
import { BsThreeDots } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getVideo, createVideo, updateVideo, deleteVideo } from '~/actions/video';
import Loader from './../../components/Layout/components/Loader';
import Administration from '~/components/Layout/components/Administration';
const cx = classNames.bind(styles);

function VideoYT() {
    const inputRef = useRef();
    const [currentId, setCurrentId] = useState(null);
    const [videoData, setVideoData] = useState({
        name: '',
        link: '',
        auth: '',
    });
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.videos);
    const video = useSelector((state) => (currentId ? state.videos.find((p) => p._id === currentId) : null));

    useEffect(() => {
        if (video) setVideoData(video);
    }, [video]);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updateVideo(currentId, videoData));
        } else {
            dispatch(createVideo(videoData));
        }
        setCurrentId(null);
        setVideoData({ name: '', link: '', auth: '' });
        inputRef.current.focus();
    };

    useEffect(() => {
        dispatch(getVideo());
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
                        <p className={cx('title')}>Video Management</p>
                        <span className={cx('subtitle')}>
                            Get started with our app, just create an account and enjoy the experience.
                        </span>
                    </div>
                    <br />
                    <div className={cx('input_container')}>
                        <label className={cx('input_label')} htmlFor="name_field">
                            Video Name
                        </label>
                        <SiNamecheap className={cx('icon')} />
                        <input
                            placeholder="Video Name"
                            title="Input title"
                            value={videoData.name}
                            ref={inputRef}
                            onChange={(e) => setVideoData({ ...videoData, name: e.target.value })}
                            name="input-name"
                            type="text"
                            className={cx('input_field')}
                            id="name_field"
                        />
                    </div>
                    <div className={cx('input_container')}>
                        <label className={cx('input_label')} htmlFor="password_field">
                            Link
                        </label>
                        <BiCategoryAlt className={cx('icon')} />
                        <input
                            placeholder="Link"
                            title="Input title"
                            name="input-name"
                            type="text"
                            value={videoData.link}
                            onChange={(e) => setVideoData({ ...videoData, link: e.target.value })}
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
                            value={videoData.auth}
                            onChange={(e) => setVideoData({ ...videoData, auth: e.target.value })}
                            className={cx('input_field')}
                            id="auth_field"
                        />
                    </div>

                    <button title="Sign In" type="submit" className={cx('sign-in_apl')}>
                        <MdOutlineCreateNewFolder className={cx('iconCreate')} />
                        <span>{currentId ? 'Update' : 'Create'} Video</span>
                    </button>
                    <p className={cx('note')}>Terms of use &amp; Conditions</p>
                </form>
            </div>

            {!videos.length ? (
                <Loader />
            ) : (
                <div className={cx('container', 'product_container')}>
                    <div className="row pe-4">
                        {videos.map((video, index) => (
                            <div key={index} className={cx('col-lg-4', 'mt-5')}>
                                <div className={cx('productItem')}>
                                    <div className={cx('productItem__content')}>
                                        <h2>{video.name}</h2>
                                        <div className={cx('productItem__description')}>
                                            <span>
                                                <span style={{ fontWeight: '600' }}>Đường link: </span>{' '}
                                                {video.link.replace('watch?v=', 'embed/').slice(0, 41)}
                                            </span>
                                            <span className={cx('mt-4')}>
                                                <span style={{ fontWeight: '600' }}>Nguồn: </span> {video.auth}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('productItem__action')}>
                                        <RiDeleteBin5Fill
                                            className={cx('productItem__action--icon')}
                                            onClick={() => dispatch(deleteVideo(video._id))}
                                        />
                                        <BsThreeDots
                                            className={cx('productItem__action--icon')}
                                            onClick={() => setCurrentId(video._id)}
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

export default VideoYT;
