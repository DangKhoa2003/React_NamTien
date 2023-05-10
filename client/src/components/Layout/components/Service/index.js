import classNames from 'classnames/bind';
import styles from './Service.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '~/actions/banner';

const cx = classNames.bind(styles);
function Service() {
    const banners = useSelector((state) => state.banners);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBanners());
    }, [dispatch]);
    return (
        <section
            data-aos="fade"
            data-aos-delay="200"
            className={cx('service')}
            style={{ backgroundImage: `url(${banners[2].selectedFile})` }}
        >
            <h1 className={cx('aboutTitle')}>
                Dịch vụ
                <div className={cx('aboutTitle_space')}></div>
            </h1>
            <div className="container mt-5" data-aos="fade-up" data-aos-delay="400">
                <div className="row">
                    <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6', 'service_item')}>
                        <img src={require('~/assets/img/Group24.png')} alt="Service1" />
                        <h2>Tư vấn thiết kế</h2>
                    </div>

                    <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6', 'service_item')}>
                        <img src={require('~/assets/img/Group25.png')} alt="Service1" />
                        <h2>Thi công trọn gói</h2>
                    </div>

                    <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6', 'service_item')}>
                        <img src={require('~/assets/img/Group24.png')} alt="Service1" />
                        <h2>Sản xuất của sắt</h2>
                    </div>

                    <div className={cx('col-lg-3', 'col-md-6', 'col-sm-6', 'service_item')}>
                        <img src={require('~/assets/img/Group25.png')} alt="Service1" />
                        <h2>Thương mại dịch vụ</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Service;
