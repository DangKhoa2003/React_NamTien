import classNames from 'classnames/bind';
import styles from './Company.module.scss';
import FileBase from 'react-file-base64';
import { FaReact } from 'react-icons/fa';
import { SiNamecheap } from 'react-icons/si';
import { BsThreeDots } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '~/actions/company';
import Loader from './../../components/Layout/components/Loader';
import Administration from '~/components/Layout/components/Administration';
const cx = classNames.bind(styles);

function Company() {
    const inputRef = useRef();
    const [currentId, setCurrentId] = useState(null);
    const [companyData, setCompanyData] = useState({
        title: '',
        image: '',
    });
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies);
    const company = useSelector((state) => (currentId ? state.companies.find((p) => p._id === currentId) : null));

    useEffect(() => {
        if (company) setCompanyData(company);
    }, [company]);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updateCompany(currentId, companyData));
        } else {
            dispatch(createCompany(companyData));
        }
        setCurrentId(null);
        setCompanyData({ title: '' });
        inputRef.current.focus();
    };

    useEffect(() => {
        dispatch(getCompanies());
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
                        <p className={cx('title')}>{currentId ? 'Update' : 'Create'} Company</p>
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
                            value={companyData.title}
                            ref={inputRef}
                            onChange={(e) => setCompanyData({ ...companyData, title: e.target.value })}
                            name="input-name"
                            type="text"
                            className={cx('input_field')}
                            id="name_field"
                        />
                    </div>

                    <label htmlFor="file-input" className={cx('drop-container')}>
                        <span className={cx('drop-title')}>Drop files here</span>
                        or
                        <FileBase
                            multiple={false}
                            onDone={({ base64 }) => setCompanyData({ ...companyData, image: base64 })}
                            type="file"
                            required=""
                            id="file-input"
                        />
                    </label>

                    <button title="Sign In" type="submit" className={cx('sign-in_apl')}>
                        <MdOutlineCreateNewFolder className={cx('iconCreate')} />
                        <span>{currentId ? 'Update' : 'Create'} Company</span>
                    </button>
                    <p className={cx('note')}>Terms of use &amp; Conditions</p>
                </form>
            </div>

            {!companies.length ? (
                <Loader />
            ) : (
                <div className={cx('container', 'product_container')}>
                    <div className="row pe-4">
                        {companies.map((company, index) => (
                            <div key={index} className={cx('col-lg-4', 'mt-5')}>
                                <div className={cx('productItem')}>
                                    <img src={company.image} alt="Img Prod" />
                                    <div className={cx('productItem__content')}>
                                        <h2>{company.title}</h2>
                                    </div>
                                    <div className={cx('productItem__action')}>
                                        <RiDeleteBin5Fill
                                            className={cx('productItem__action--icon')}
                                            onClick={() => dispatch(deleteCompany(company._id))}
                                        />
                                        <BsThreeDots
                                            className={cx('productItem__action--icon')}
                                            onClick={() => setCurrentId(company._id)}
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

export default Company;
