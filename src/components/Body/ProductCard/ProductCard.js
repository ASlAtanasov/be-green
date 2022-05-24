import React from 'react';
import './ProductCard.css';
import { useAuthUserContext } from '../../../contexts/AuthContext';
import { useOrderedProductsContext } from '../../../contexts/OrderedProductsContext';

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProductCard = ({ name, description, imageUrl, price, item, setItem, showModal, setShowModal }) => {
    const { user } = useAuthUserContext();
    const {orderedProducts, setOrderedProducts} = useOrderedProductsContext();

   const onClickShowModalHandler = async (e) => {
        e.preventDefault();

        await setItem(item);
        console.log(item);

        setShowModal(true);

    }

    const onClickSetOrderedProductsHandler = async (e) => {
        e.preventDefault();
        await setOrderedProducts([...orderedProducts, item]);
        
        localStorage.setItem('orderedProducts', JSON.stringify([...orderedProducts, item]));
    }

    //let userInLocalStorage = localStorage.getItem('user');
    //console.log(userInLocalStorage);

    return (
        <Card className='product-card'>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body className='product-card-body'>
                <Card.Title className='product-card-title'>{name}</Card.Title>
                <article className='product-card-cardbody-cardtext'>
                    <p>{description}</p>
                </article>
                <p className='product-card-price'>Price: {price} lv.</p>
                <section className='product-card-section-buttons'>
                    <section className='guest-buttons'>
                        <Button className='product-card-button-datails' variant="primary" onClick={onClickShowModalHandler}><Link className='product-card-button-details-link' to={'#'}>Details</Link></Button>
                        <Button className='product-card-button-order' variant="primary"><Link className='product-card-button-order-link' to={'#'} onClick={onClickSetOrderedProductsHandler}>Order</Link></Button>
                    </section>

                    {user && user.uid && user.uid === '2CLGcFqcCASXAdKXb0HHAz7neIj1'
                        ? <section className='admin-buttons'>
                            <Button className='product-card-button-edit' variant="primary"><Link className='product-card-button-edit-link' to={'#'}>Edit</Link></Button>
                            <Button className='product-card-button-delete' variant="primary"><Link className='product-card-button-delete-link' to={'#'}>Delete</Link></Button>
                        </section>
                        : ''}

                </section>
            </Card.Body>
        </Card >

    );
};

export default ProductCard;


