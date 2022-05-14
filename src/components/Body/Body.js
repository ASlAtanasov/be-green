import React, { useEffect, useState } from 'react';
import './Body.css';
import MenuWithToggle from '../MenuWithToggle/MenuWithToggle';
import { useAuthUserContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faHandSparkles, faBarcode, faStaffAesculapius, faHandHoldingHeart, faDroplet, faPersonHalfDress, faTrademark, faSortUp } from '@fortawesome/free-solid-svg-icons';

const CareAboutOptions = ['Whole body', 'Face', 'Hair', 'Hands'];
const BrandsOptions = ['Avon', 'Garnier', 'Loreal', 'Oriflame'];
const ProductsOptions = ['Cream', 'Lotion', 'Oil', 'Shampoo'];
const SkinTypeOptions = ['Dry', 'Moist', 'Normal'];


const Home = () => {
    const { user } = useAuthUserContext();
    const [isClicked, setIsClicked] = useState(false);

    const toggleClassFilterButtonOnClick = (e) => {
        e.preventDefault();

        setIsClicked(!isClicked);

    }

    return (

        <div className="body-container">
            <div className="sidebar">
                <div className="side-wrapper">
                    <div className="side-title">BODY CARE</div>
                    <div className="side-menu">

                        <a className="sidebar-link" href="#">
                            <FontAwesomeIcon icon={faPersonHalfDress} />
                            Whole body
                        </a>
                        <a className="sidebar-link trending" href="#">
                            <FontAwesomeIcon icon={faFaceSmile} />
                            Face
                        </a>
                        <a className="sidebar-link" href="#">
                            <FontAwesomeIcon icon={faDroplet} />
                            Hair
                        </a>
                        <a className="sidebar-link" href="#">
                            <FontAwesomeIcon icon={faHandHoldingHeart} />
                            Hands
                        </a>
                    </div>
                </div>
                <div className="side-wrapper">
                    <div className="side-title">FILTERS</div>
                    <div className="side-menu">
                        <MenuWithToggle label='Care about' options={CareAboutOptions} icon={faStaffAesculapius} />

                        <MenuWithToggle label='Brands' options={BrandsOptions} icon={faTrademark} />

                        <MenuWithToggle label='Products' options={ProductsOptions} icon={faBarcode} />

                        <MenuWithToggle label='Skin type' options={SkinTypeOptions} icon={faHandSparkles} />               
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="header">

                    {user
                        ? (<>
                            <span className="logo">Welcome, {user.email}!</span>
                        </>)
                        : <span className="logo">Welcome!</span>
                    }
                </div>
                <div className="main-container">
                    <div className="main-header anim" /*style={"--delay: 0s"*/>Discover the products you need</div>
                    <div className='products-list'>

                    </div>

                    {/* <div className="products">
                        
                    </div> */}
                </div>
            </div>
        </div>



    );
};

export default Home;