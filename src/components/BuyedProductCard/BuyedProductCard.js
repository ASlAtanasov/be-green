import React  from 'react';
import './BuyedProductCard.css';

const BuyedProductCard = (props) => {

    return (
        <section className='section-product'>
            <article className='order-product-image'>
                <img src={props.product.imageUrl} />
            </article>
            <article className='order-product-data'>
                <p className='order-product-data-name'>
                    <span>{props.product.name}</span>
                </p>
                <p className='order-product-data-price'>
                    <span>Price per product: {props.product.price} lv.</span>
                </p>
                <p className='order-product-data-quantity'>
                    <label htmlFor='quantity'>Quantity: {props.product.quantity}</label>
                </p>
            </article>
        </section>
    );
};

export default BuyedProductCard;


