import classNames from 'classnames/bind';
import styles from './EditBanner.module.scss';
import FileBase from 'react-file-base64';
import { FaReact } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBanners, createBanner, updateBanner, deleteBanner } from '~/actions/banner';
import Loader from './../../components/Layout/components/Loader';
import Administration from '~/components/Layout/components/Administration';
const cx = classNames.bind(styles);

function EditBanner() {
    const [currentId, setCurrentId] = useState(null);
    const [bannerData, setBannerData] = useState({
        selectedFile: '',
    });
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.banners);
    
    const banner = useSelector((state) => (currentId ? state.banners.find((p) => p._id === currentId) : null));

    useEffect(() => {
        if (banner) setBannerData(banner);
    }, [banner]);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updateBanner(currentId, bannerData));
        } else {
            dispatch(createBanner(bannerData));
        }

        setCurrentId(null);
    };

    useEffect(() => {
        dispatch(getBanners());
    }, [currentId, dispatch]);
    return (
        <section className={cx('editBanner')}>
            <Administration />

            <div className={cx('outBg', 'container')}>
                <form className={cx('form_container')} onSubmit={handleSubmit}>
                    <div className={cx('logo_container')}>
                        <FaReact className={cx('logo_container--icon')} />
                    </div>

                    <div className={cx('title_container')}>
                        <p className={cx('title')}>{currentId ? 'Update' : 'Create'} Banner</p>
                        <span className={cx('subtitle')}>
                            Get started with our app, just create an account and enjoy the experience.
                        </span>
                    </div>
                    <br />

                    <label htmlFor="file-input" className={cx('drop-container')}>
                        <span className={cx('drop-title')}>Drop files here</span>
                        or
                        <FileBase
                            multiple={false}
                            onDone={({ base64 }) => setBannerData({ selectedFile: base64 })}
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

            {!banners.length ? (
                <Loader />
            ) : (
                <div className={cx('container', 'product_container')}>
                    <div className="row pe-4">
                        {banners.map((banner, index) => (
                            <div key={index} className={cx('col-lg-4', 'mt-5')}>
                                <div className={cx('productItem')}>
                                    <img src={banner.selectedFile} alt="Img Prod" />
                                    <div className={cx('productItem__action')}>
                                        <RiDeleteBin5Fill
                                            className={cx('productItem__action--icon')}
                                            onClick={() => dispatch(deleteBanner(banner._id))}
                                        />
                                        <BsThreeDots
                                            className={cx('productItem__action--icon')}
                                            onClick={() => setCurrentId(banner._id)}
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

export default EditBanner;
