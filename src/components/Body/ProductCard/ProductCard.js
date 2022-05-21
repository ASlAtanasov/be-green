import React from 'react';
import './ProductCard.css';
import { useAuthUserContext } from '../../../contexts/AuthContext';

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';





const ProductCard = ({ name, description, imageUrl, price, item, setItem, showModal, setShowModal }) => {
    const { user } = useAuthUserContext();

    const onClickShowModalHandler = async (e) => {
        e.preventDefault();

        await setItem(item);
        console.log(item);

        setShowModal(true);

    }

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
                    <Button className='product-card-button-datails' variant="primary" onClick={onClickShowModalHandler}><Link className='product-card-button-details-link' to={'#'}>Details</Link></Button>
                    {user.uid === '2CLGcFqcCASXAdKXb0HHAz7neIj1'
                        ? <>
                            <Button className='product-card-button-edit' variant="primary"><Link className='product-card-button-edit-link' to={'#'}>Edit</Link></Button>
                            <Button className='product-card-button-delete' variant="primary"><Link className='product-card-button-delete-link' to={'#'}>Delete</Link></Button>
                        </>
                        : ''}
                </section>
            </Card.Body>
        </Card>

    );
};

export default ProductCard;


