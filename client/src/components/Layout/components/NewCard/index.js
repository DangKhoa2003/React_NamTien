import classNames from 'classnames/bind';
import styles from './NewCard.module.scss';
const cx = classNames.bind(styles);
function NewCard({ post }) {
    return (
        <div className={cx('newsCard')}>
            <div className={cx('newsCard_div')}>
                <img className={cx('newsCard_img')} src={post.image} alt="Tin tức" />
            </div>
            <div className={cx('newsCard_text')}>
                <h2>{post.title}</h2>
                <p>
                    {post.description}
                </p>
            </div>
        </div>
    );
}

export default NewCard;
