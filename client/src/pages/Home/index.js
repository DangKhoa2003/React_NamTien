import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import OwlCarousel from 'react-owl-carousel';
import NumberCounter from 'number-counter';
import { Fragment, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '~/actions/banner';
import { getPosts } from '~/actions/post';
import { getVideo } from '~/actions/video';

import Button from '~/components/Layout/components/Button';
import Service from '~/components/Layout/components/Service';
import ViewProducts from '~/components/Layout/components/ViewProducts';
import NewCard from '~/components/Layout/components/NewCard';

import { VscQuote } from 'react-icons/vsc';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// Image Tin Tức

import Loader from '~/components/Layout/components/Loader';

const cx = classNames.bind(styles);
function Home() {
    const banners = useSelector((state) => state.banners);
    const posts = useSelector((state) => state.posts);
    const videos = useSelector((state) => state.videos);
    const news = posts.filter((item, index) => item.auth === 'Admin');
    const evaluate = posts.filter((item, index) => item.auth !== 'Admin');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBanners());
        dispatch(getPosts());
        dispatch(getVideo());
    }, [dispatch]);

    return (
        <Fragment>
            <div className={cx('sliderOwl')} data-aos="fade-up-left" data-aos-delay="200">
                {!banners.length ? <Loader /> : <img src={banners[0].selectedFile} alt="Slider 1" />}
            </div>

            <section className={cx('container', 'block_section')}>
                <div className="row">
                    <div
                        className={cx('col-lg-6', 'col-md-12', 'col-sm-12', 'about')}
                        data-aos="fade-left"
                        data-aos-delay="400"
                    >
                        <h1 className={cx('aboutTitle')}>
                            Về Chúng Tôi
                            <div className={cx('aboutTitle_space')}></div>
                        </h1>
                        <p className={cx('about_description')}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia voluptates excepturi,
                            aspernatur blanditiis officiis deserunt numquam nisi saepe facere ducimus voluptatem, quidem
                            quas! Officiis et cupiditate nemo ex vitae id. Ad nesciunt ab necessitatibus pariatur neque
                            corrupti aut, molestias commodi quod deserunt deleniti ut et dolore ipsa amet atque
                            consequatur. Adipisci deleniti ipsum, tempore impedit sit temporibus unde ut dolores! Soluta
                            ab adipisci saepe vero itaque magnam eligendi repellendus fugit a optio nulla beatae cum
                            dolorum, ad error in doloribus autem, odio distinctio quasi repudiandae neque est esse
                            accusantium. Vitae?
                        </p>
                        <div className={cx('row', 'experience_desktop')} data-aos="fade-left" data-aos-delay="400">
                            <div className={cx('col-lg-4 col-md-4 col-sm-4', 'counter')}>
                                <NumberCounter end={20} delay={2} className={cx('increment')} postFix="+" />
                                <span>Năm kinh nghiệm</span>
                            </div>
                            <div className={cx('col-lg-4 col-md-4 col-sm-4', 'counter')}>
                                <NumberCounter end={20} delay={2} className={cx('increment')} postFix="+" />
                                <span>Năm kinh nghiệm</span>
                            </div>
                            <div className={cx('col-lg-4 col-md-4 col-sm-4', 'counter')}>
                                <NumberCounter end={20} delay={2} className={cx('increment')} postFix="+" />
                                <span>Năm kinh nghiệm</span>
                            </div>
                        </div>
                        <OwlCarousel
                            className={cx('owl-theme', 'row', 'experience')}
                            autoplayHoverPause={true}
                            rewind={true}
                            autoplay={true}
                            autoplayTimeout={2000}
                            items={2}
                            loop
                            margin={10}
                            nav={false}
                            dots={false}
                            data-aos="fade-left"
                            data-aos-delay="400"
                        >
                            <div className={cx('counter')}>
                                <NumberCounter end={20} delay={2} className={cx('increment')} postFix="+" />
                                <span>Năm kinh nghiệm</span>
                            </div>
                            <div className={cx('counter')}>
                                <NumberCounter end={25} delay={2} className={cx('increment')} postFix="+" />
                                <span>Năm kinh nghiệm</span>
                            </div>
                            <div className={cx('counter')}>
                                <NumberCounter end={30} delay={2} className={cx('increment')} postFix="+" />
                                <span>Năm kinh nghiệm</span>
                            </div>
                        </OwlCarousel>
                        <div className={cx('btn_moreSearch')}>
                            <Button />
                        </div>
                    </div>

                    <div
                        className={cx('col-lg-6', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center')}
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        {!banners.length ? (
                            <Loader />
                        ) : (
                            <img className={cx('about-img')} src={banners[1].selectedFile} alt="About" />
                        )}
                    </div>
                </div>
            </section>

            {!banners.length ? <Loader /> : <Service />}

            <ViewProducts title={'Sắt Mỹ Thuật'} />
            <ViewProducts title={'Cầu Thang Sắt'} bg={'#C0C0C0'} />
            <ViewProducts title={'Hàng Rào'} />
            <ViewProducts title={'Mái Tôn'} bg={'#C0C0C0'} />
            <ViewProducts title={'Vách Ngăn'} />

            <section className={cx('container', 'block_section')}>
                <div className="row">
                    <div
                        className={cx('col-lg-5', 'col-md-12', 'col-sm-12', 'news')}
                        data-aos="fade-left"
                        data-aos-delay="400"
                    >
                        <h1 className={cx('newsTitle')}>
                            Tin Tức
                            <div className={cx('newsTitle_space')}></div>
                        </h1>

                        <div className={cx('news')}>
                            {!news.length ? <Loader /> : news.map((post, index) => <NewCard key={index} post={post} />)}
                        </div>
                    </div>

                    <div
                        className={cx('col-lg-7', 'col-md-12', 'col-sm-12', 'videosTitle__div')}
                        data-aos="fade-left"
                        data-aos-delay="400"
                    >
                        <h1 className={cx('videosTitle')}>
                            Video
                            <div className={cx('videos_space')}></div>
                        </h1>

                        <div className={cx('owlCarousel_div')}>
                            <OwlCarousel
                                className={cx('videos', 'owl-theme')}
                                items={1}
                                margin={10}
                                dots={false}
                                lazyLoad={true}
                                URLhashListener={true}
                                URLhashNavigation
                                startPosition={'URLHash'}
                            >
                                {!videos.length ? (
                                    <Loader />
                                ) : (
                                    videos.map((video, index) => (
                                        <div key={index} className="item" data-hash={`slide-${index}`}>
                                            <iframe
                                                title={video.name}
                                                height="316px"
                                                controls={true}
                                                className={cx('videos_control')}
                                                // poster={require('~/assets/img/PosterVideo.png')}
                                                src={video.link.replace('watch?v=', 'embed/').slice(0, 41)}
                                            ></iframe>
                                        </div>
                                    ))
                                )}
                            </OwlCarousel>
                        </div>

                        <div className={cx('video-tabChildren')}>
                            <div className={cx('row')}>
                                <div className={cx('col-lg-3', 'mt-5')}>
                                    <a href="#slide-0">
                                        <img
                                            width="100%"
                                            className={cx('video-children')}
                                            src={require('~/assets/img/tintuc1.png')}
                                            alt="Video tin tức 1"
                                        />
                                    </a>
                                </div>

                                <div className={cx('col-lg-3', 'mt-5')}>
                                    <a href="#slide-1">
                                        <img
                                            width="100%"
                                            className={cx('video-children')}
                                            src={require('~/assets/img/tintuc2.png')}
                                            alt="Video tin tức 2"
                                        />
                                    </a>
                                </div>

                                <div className={cx('col-lg-3', 'mt-5')}>
                                    <a href="#slide-2">
                                        <img
                                            width="100%"
                                            className={cx('video-children')}
                                            src={require('~/assets/img/tintuc3.png')}
                                            alt="Video tin tức 3"
                                        />
                                    </a>
                                </div>

                                <div className={cx('col-lg-3', 'mt-5')}>
                                    <a href="#slide-0">
                                        <img
                                            width="100%"
                                            className={cx('video-children')}
                                            src={require('~/assets/img/tintuc1.png')}
                                            alt="Video tin tức 1"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {!banners.length ? (
                <Loader />
            ) : (
                <section
                    className={cx('block_section', 'mgin-5')}
                    style={{
                        backgroundImage: `url(${banners[3].selectedFile})`,
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <h1 className={cx('customerTitle', 'text-center')}>
                        Khách hàng nói về chúng tôi
                        <div className={cx('customerTitle_space', 'text-center')}></div>
                    </h1>
                    <div className={cx('container', 'block_customer')}>
                        <OwlCarousel
                            className={cx('owl-theme')}
                            autoplayHoverPause={true}
                            rewind={true}
                            autoplay={true}
                            autoplayTimeout={2000}
                            items={1}
                            dots={false}
                            loop
                            margin={10}
                            nav={false}
                        >
                            {!evaluate.length ? (
                                <Loader />
                            ) : (
                                evaluate.map((evaluation, index) => (
                                    <div key={index} className={cx('item', 'itemCustomer')}>
                                        <div className={cx('d-flex', 'itemCustomer__mobile')}>
                                            <div className={cx('col-lg-4', 'itemCustomer__tagDiv')}>
                                                <img
                                                    className={cx('itemCustomer__img')}
                                                    src={evaluation.image}
                                                    alt={evaluation.title}
                                                />
                                            </div>

                                            <div className={cx('itemCustomer__description')}>
                                                <VscQuote className={cx('iconQuote')} />
                                                <p className={cx('itemCustomer__description--p')}>
                                                    {evaluation.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </OwlCarousel>
                    </div>
                </section>
            )}
        </Fragment>
    );
}

export default memo(Home);
