import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/productService';
import { useAuthUserContext } from '../../contexts/AuthContext';
import OrderedProductCard from '../OrderedProductCard';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import './Cart.css';
import { v4 } from 'uuid';

const Cart = () => {
    const { user } = useAuthUserContext();
    const { orderedProducts, setOrderedProducts } = useOrderedProductsContext();

    // useEffect(() => {
    //     try {
    //        let orderedProductsInLocaStorage = localStorage.setItem('orderedProducts', JSON.stringify(orderedProducts));
    //         if(orderedProductsInLocaStorage) {
    //             setOrderedProducts(orderedProductsInLocaStorage);
    //         }
    //     } catch (error) {
    //         alert(error);
    //     }
    // }, []);

    return (
        <div className="Cart-container">
            <div className="wrapper">
                <div className="main-container">
                    <div className="main-header anim">Dear {user ? user.email : 'customer'}, these are the products you chose!</div>
                    <div className='ordered-products-list'>
                        <ul>
                            {orderedProducts?.map((orderedProduct) => {
                                console.log(111, orderedProducts);
                               return (<OrderedProductCard key={v4()} item={orderedProduct} />)
                            })
                            }

                        </ul>
                        {orderedProducts.length > 0 || <h3 className='empty-order-list'>You haven't ordered anytheng yet!</h3>}
                    </div>
                    {orderedProducts && <div className='ordered-products-total-price'>
                            Total price: 
                    </div>}
                    <button>Buy</button>

                </div>
            </div>
        </div >
    );
};

export default Cart;