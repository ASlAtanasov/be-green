import React, { useState } from 'react';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import './OrderedProductCard.css';

const OrderedProductCard = (props) => {
    const { orderedProducts, setOrderedProducts } = useOrderedProductsContext();
    let [brand, careAbout, description, id, imageName, imageUrl, name, price, productType, skinType, quantity] = Object.values(props.item);
    let [quantityOrdered, setQuantityOrdered] = useState(1);
    //console.log('quantityOrdered in OrderedCardProducts: ' + quantityOrdered);

    // orderedProducts.map((product) => {
    //     product.quantity = quantityOrdered;
    //    console.log('product: ' + JSON.stringify(product));
    // });


    //console.log('orderedProducts in OrderedCardProducts: ' + JSON.stringify(orderedProducts));


    const onClickDeleteItemHandler = async () => {
        let filteredOrderedItems = orderedProducts.filter((product) => product.id !== id)
        await setOrderedProducts([...filteredOrderedItems])
        localStorage.setItem('orderedProducts', JSON.stringify([...filteredOrderedItems]));
    }

    const setItemQuantityHandler = async (e) => {
       
        if (e.target.validity.valid) {
            let newOrderedProducts = orderedProducts.map((product) => {
                if (product.id == e.target.dataset.id) {
                    product = { ...product, quantity: e.target.value };
                }
                return product;
            })
            // e.target.defaultValue = e.target.value;
            //setQuantityOrdered(e.target.value)
            await setOrderedProducts([...newOrderedProducts]);
        }
    };


    return (
        <li className='ordered-product'>
            <article className='ordered-product-image'>
                <img src={imageUrl} />
            </article>
            <article className='ordered-product-data'>
                <p className='ordered-product-data-name'>
                    <span>{name}</span>
                </p>
                <p className='ordered-product-data-price'>
                    <span>Price per product: {price} lv.</span>
                </p>
                <p className='ordered-product-data-quantity'>
                    <label htmlFor='quantity'>Quantity</label>
                    <input
                        type='text'
                        pattern='[0-9]'
                        id='quantity'
                        name='quantity'
                        className='ordered-product-data-quantity'
                        data-id={id}
                        value={quantity}
                        onInput={setItemQuantityHandler} />
                </p>
                <p className='ordered-product-data-button-close'>
                    <label htmlFor='remove'>Remove</label>
                    <button id='remove' onClick={onClickDeleteItemHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>
                    </button>
                </p>
            </article>
        </li>
    );
};

export default OrderedProductCard;


