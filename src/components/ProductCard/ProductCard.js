import React from 'react';
import './ProductCard.css';
import { useAuthUserContext } from '../../contexts/AuthContext';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import ModalConfirmation from '../ModalConfirmation';
import {useModalContentContext} from '../../contexts/ModalContentContext';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext';

const confirmDelete = {
    delete: 'Are you sure that you want to delete this product?'
};

const ProductCard = ({ item, setItem }) => {
    const { user } = useAuthUserContext();
    const { productToDelete, setProductToDelete} = useProductsContext();
    const { orderedProducts, setOrderedProducts } = useOrderedProductsContext();
    const {showModalConfirmation, setShowModalConfirmation, setShowModalItemContent} = useModalContentContext();

    const onClickDetailsShowModalHandler = async (e) => {
        e.preventDefault();

        await setItem(item);
        setShowModalItemContent(true);
    };

    const onClickDeleteShowModalHandler = async (e) => {
       e.preventDefault();
       await setProductToDelete(item);
        console.log('item in ProductCard: ' + JSON.stringify(item));

        setShowModalConfirmation(true);
    }

    const onClickSetOrderedProductsHandler = async (e) => {
        e.preventDefault();
        if (orderedProducts.every((product) => product.id !== item.id)) {
            await setOrderedProducts([...orderedProducts, { ...item, quantity: 1 }]);

            localStorage.setItem('orderedProducts', JSON.stringify([...orderedProducts, item]));
        } else {
            alert('You have already ordered this product');
        }

    };

    return (
        <Card className='product-card'>
            <Card.Img variant="top" src={item.imageUrl} />
            <Card.Body className='product-card-body'>
                <Card.Title className='product-card-title'>{item.name}</Card.Title>
                <article className='product-card-cardbody-cardtext'>
                    <p>{item.description}</p>
                </article>
                <p className='product-card-price'>Price: {item.price} lv.</p>
                <section className='product-card-section-buttons'>
                    <section className='guest-buttons'>
                        <Button className='product-card-button-datails' variant="primary" onClick={onClickDetailsShowModalHandler}><Link className='product-card-button-details-link' to={'#'}>Details</Link></Button>
                        <Button className='product-card-button-order' variant="primary"><Link className='product-card-button-order-link' to={'#'} onClick={onClickSetOrderedProductsHandler}>Order</Link></Button>
                    </section>

                    {user && user.uid && user.uid === '2CLGcFqcCASXAdKXb0HHAz7neIj1'
                        ? <section className='admin-buttons'>
                            <Button className='product-card-button-edit' variant="primary"><Link className='product-card-button-edit-link' to={`products/edit/${item.id}`}>Edit</Link></Button>
                            <Button className='product-card-button-delete' variant="primary"><Link className='product-card-button-delete-link' to={'#'} onClick={onClickDeleteShowModalHandler}>Delete</Link></Button>
                        </section>
                        : ''}

                </section>
            </Card.Body>
            <ModalConfirmation
                        className={`${showModalConfirmation && 'modal-active-confirmation'}`}
                        itemtodelete={'product'}                                              
                        text={confirmDelete.delete}
                        show={showModalConfirmation}
                        onHide={() => setShowModalConfirmation(false)}
                    />
        </Card >

    );
};

export default ProductCard;


