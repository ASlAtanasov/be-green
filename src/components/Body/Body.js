import React from 'react';
import './Body.css';
import MenuWithToggle from '../MenuWithToggle/MenuWithToggle';
import SideNavigationLink from '../SideNavigationLink';
import { useAuthUserContext } from '../../contexts/AuthContext';
import { faFaceSmile, faHandSparkles, faBarcode, faStaffAesculapius, faHandHoldingHeart, faDroplet, faPersonHalfDress, faTrademark } from '@fortawesome/free-solid-svg-icons';

const BodyCareOptions = [{
    title: 'Whole body',
    icon: faPersonHalfDress,
},
{
    title: 'Face',
    icon: faFaceSmile,
},
{
    title: 'Hair',
    icon: faDroplet,
},
{
    title: 'Hands',
    icon: faHandHoldingHeart,
}];

const CareAboutOptions = ['Whole body', 'Face', 'Hair', 'Hands'];
const BrandsOptions = ['Avon', 'Garnier', 'Loreal', 'Oriflame'];
const ProductsOptions = ['Cream', 'Lotion', 'Mask', 'Oil', 'Shampoo', 'Wash'];
const SkinTypeOptions = ['Dry', 'Moist', 'Normal'];



const Home = () => {
    const { user } = useAuthUserContext();

    return (

        <div className="body-container">
            <div className="sidebar">
                <div className="side-wrapper">
                    <div className="side-title">BODY CARE</div>
                    <div className="side-menu">

                        {BodyCareOptions.map((opt) => (
                            <SideNavigationLink key={opt} title={opt.title} icon={opt.icon} />
                        ))}

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