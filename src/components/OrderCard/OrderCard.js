import React, { useState } from 'react';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import BuyedProductCard from '../BuyedProductCard';
import { updateOrderStatus, deleteItem, getAll } from '../../services/productService';
import { OrderStatus } from '../../constants';
import { v4 } from 'uuid';
import './OrderCard.css';
import ModalConfirmation from '../ModalConfirmation';
import { useModalContentContext } from '../../contexts/ModalContentContext';

const confirmation = {
    delete: 'Are you sure that you want to delete this order?'
}

const OrderCard = (props) => {
    const { setOrders, setFilteredOrders } = useOrderedProductsContext();
    const {showModal, setShowModal} = useModalContentContext();

    const { id, orderedProducts, status, totalPrice, user } = props;
   
    const onClickSentButtonHandler = async (e) => {
        e.preventDefault();
        await updateOrderStatus(id, OrderStatus.sent);  
        getAll('orders', setOrders, setFilteredOrders);          
    };

    const onClickReceivedButtonHandler = async (e) => {
        e.preventDefault();
        await updateOrderStatus(id, OrderStatus.received);   
        getAll('orders', setOrders, setFilteredOrders); 
    };

    const onClickArchiveButtonHandler = async (e) => {
        e.preventDefault();
        await updateOrderStatus(id, OrderStatus.archived);     
        getAll('orders', setOrders, setFilteredOrders); 
    };

    const onClickDeleteButtonHandler = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    return (
        <li className='order-product'>
            <section className='section-user'>
                <article className='order-user-data'>
                    <p className='order-user-data-name'>Name:
                        <span className='order-user-data-first-name'>{user.firstName}</span>
                        <span className='order-user-data-last-name'>{user.lastName},</span>
                    </p>
                    <p className='order-user-data-address'> Address:
                        <span className='order-user-data-address-country'>{props.user.country},</span>
                        <span className='order-user-data-address-city'>{props.user.city},</span>
                        <span className='order-user-data-address-street'>{props.user.address} Street.</span>
                        <span className='order-user-data-address-postal-code'>Postal code: {props.user.postalCode}.</span>
                    </p>
                    <p className='order-user-data-phone'>Phone number:
                        <span className='order-user-data-address-country'>{props.user.phone}</span>
                    </p>
                </article>
            </section>

            {
                props.orderedProducts?.map((product) => <BuyedProductCard key={v4()} product={product} />)
            }

            <div className='ordered-products-total-price'>
                Total price: {props.totalPrice} lv.
            </div>
            <section className='order-buttons'>
                <button
                    type='submit'
                    className={`order-buttons-sent ${(status !== 'new') && 'disabled'}`}
                    disabled={props.status !== 'new'}
                    onClick={onClickSentButtonHandler}
                >SENT</button>
                <button
                    type='submit'
                    className={`order-buttons-received ${(status !== 'new' && status !== 'sent') && 'disabled'}`}
                    disabled={props.status !== 'new' && props.status !== 'sent'}
                    onClick={onClickReceivedButtonHandler}
                >RECEIVED</button>
                <button
                    type='submit'
                    className={`order-buttons-archive ${(props.status !== 'new' && props.status !== 'sent' && props.status !== 'received') && 'disabled'}`}
                    disabled={props.status != 'new' && props.status != 'sent' && props.status != 'received'}
                    onClick={onClickArchiveButtonHandler}
               >ARCHIVE</button>
               <button
                    type='submit'
                    className='order-buttons-delete'                    
                    onClick={onClickDeleteButtonHandler}
               >DELETE</button>
            </section>
            <ModalConfirmation className={`${showModal && 'modal-active'}`} id={id} text={confirmation.delete} show={showModal} onHide={() => setShowModal(false)} />
        </li>
    );
};

export default OrderCard;


