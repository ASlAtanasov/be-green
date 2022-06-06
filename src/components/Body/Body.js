import React, { useEffect, useState } from 'react';
import './Body.css';
import MenuWithToggle from '../MenuWithToggle/MenuWithToggle';
import SideNavigationLink from '../SideNavigationLink';
import { useAuthUserContext } from '../../contexts/AuthContext';
import { faFaceSmile, faHandSparkles, faBarcode, faStaffAesculapius, faHandHoldingHeart, faDroplet, faPersonHalfDress, faTrademark } from '@fortawesome/free-solid-svg-icons';
import { useProductsContext } from '../../contexts/ProductsContext';
import { v4 } from 'uuid';
import ProductCard from '../ProductCard';
import { Form, FormControl, Button } from 'react-bootstrap';

import { getAll, filterItemsByCheckboxCriteria, searchItems } from '../../services/productService';
import { useFilterContext } from '../../contexts/FilterContext';
import { useModalContentContext } from '../../contexts/ModalContentContext';
import ModalItemContent from '../ModalItemContent/ModalItemContent';
import { transformOptionValue } from '../../services/commonServices';

const BodyCareOptions = [
    {
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
    }
];

const CareAboutOptions = ['Whole body', 'Face', 'Hair', 'Hands'];
const BrandsOptions = ['Avon', 'Garnier', 'Loreal', 'Oriflame'];
const ProductsOptions = ['Cream', 'Lotion', 'Mask', 'Oil', 'Shampoo', 'Wash'];
const SkinTypeOptions = ['Dry', 'Moist', 'Normal'];

const Body = () => {
    const { user } = useAuthUserContext();
    const { products, setProducts, productsToDisplay, setProductsToDisplay } = useProductsContext();
    let { filterCheckedValues } = useFilterContext();
    const { itemModalContent, setItemModalContent, showModalItemContent, setShowModalItemContent } = useModalContentContext();
    const [searchedValue, setSearchedValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [filterValue, setFilterValue] = useState([]);
    


    useEffect(() => {
        try {
            getAll('products', setProducts, setProductsToDisplay);
        } catch (error) {
            alert(error);
        }
    }, []);

    const onClickFilterHandler = () => {
        filterItemsByCheckboxCriteria(products, filterCheckedValues, setProductsToDisplay);
    }

    const onChangeSearchInputHandler = (e) => {
        e.preventDefault();
        setSearchedValue(e.target.value);
    }

    const onClickSearchItemsHandler = (e) => {
        e.preventDefault();
        searchItems(products, searchedValue, setProductsToDisplay);
    }

    const onClickBodyCareHandler = (opt) => async (e) => {
        e.preventDefault();

        const [option, label] = transformOptionValue(opt.title, 'careAbout');

        setFilterValue([{ [label]: option }])
    }

    useEffect(() => {
        filterItemsByCheckboxCriteria(products, filterValue, setProductsToDisplay)
    }, [filterValue]);

    return (
        <div className="body-container">
            <div className="sidebar">
                <div className="side-wrapper">
                    <div className="side-title">BODY CARE</div>
                    <div className="side-menu">

                        {BodyCareOptions.map((opt) => (
                            <SideNavigationLink key={v4()} onClick={onClickBodyCareHandler(opt)} title={opt.title} icon={opt.icon} />
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

                        <button className='side-menu-section-button-filter' type="button" onClick={onClickFilterHandler}>Filter</button>

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
                    <Form className="d-flex">
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={onChangeSearchInputHandler}
                        />
                        <Button className='navigation-form-button' variant="outline-success" onClick={onClickSearchItemsHandler}>Search</Button>
                    </Form>
                </div>
                <div className="main-container">
                    <div className="main-header anim">Discover the products you need</div>
                    <div className='products-list'>

                        {productsToDisplay.map((product) => {
                            return (
                                <ProductCard
                                    key={v4()}
                                    item={product}
                                    setItem={setItemModalContent}
                                    setShowModalItemContent={setShowModalItemContent}
                                    setShowModalConfirmation={setShowModalItemContent}
                                />
                            )
                        })}

                    </div>
                    <ModalItemContent className={`${showModal && 'modal-active'}`} show={showModalItemContent} item={itemModalContent} onHide={() => setShowModalItemContent(false)} />
                </div>
            </div>
        </div>
    );
};

export default Body;