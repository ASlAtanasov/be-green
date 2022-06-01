import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthUserContext } from '../../contexts/AuthContext';
import OrderedProductCard from '../OrderedProductCard';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import { totalPriceCalculation, saveNewOrder } from '../../services/productService';
import { OrderStatus } from '../../constants';
import './Cart.css';
import { v4 } from 'uuid';

const Cart = () => {
    const { user } = useAuthUserContext();
    const { orderedProducts, setOrderedProducts, totalPrice, setTotalPrice } = useOrderedProductsContext();
    const navigate = useNavigate();

    useEffect(() => {
        totalPriceCalculation(orderedProducts, setTotalPrice);
    }, [orderedProducts]);

    const onClickSaveNewOrderHandler = () => {
        if(user) {
            saveNewOrder(user, orderedProducts, setOrderedProducts, totalPrice, OrderStatus.new);
        } else {
            alert('You should sign in before sending an order!');
            navigate('/login');
        }
    };

    return (
        <div className="Cart-container">
            <div className="wrapper">
                <div className="main-container">
                    <div className="main-header anim">Dear {user ? user.email : 'customer'}, these are the products you chose!</div>
                    <div className='ordered-products-list'>
                        <ul>
                            {orderedProducts?.map((orderedProduct) => {
                                return (<OrderedProductCard key={v4()} item={orderedProduct} />)
                            })}
                        </ul>
                    </div>
                    {orderedProducts.length > 0
                        ? <>
                            <div className='ordered-products-total-price'>
                                Total price: {totalPrice} lv.
                            </div>
                            <button className='ordered-products-button-buy' onClick={onClickSaveNewOrderHandler}>Buy</button>
                        </>
                        : <h3 className='empty-order-list'>You haven't ordered anytheng yet!</h3>}


                </div>
            </div>
        </div >
    );
};

export default Cart;