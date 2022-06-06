import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/productService';
import { useAuthUserContext } from '../../contexts/AuthContext';
import OrderCard from '../OrderCard';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import { OrderStatus } from '../../constants';
import { totalPriceCalculation } from '../../services/productService';
import './Orders.css';
import { v4 } from 'uuid';

const Orders = () => {
    const { user } = useAuthUserContext();
    const { orders, setOrders, filteredOrders, setFilteredOrders } = useOrderedProductsContext();
    const [totalPriceOfOrder, setTotalPriceOfOrder] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [isReceived, setIsReceived] = useState(false);
    const [isArchived, setIsArchived] = useState(false);

    useEffect(() => {
        getAll('orders', setOrders, setFilteredOrders);
    }, []);

    const onClickNewOrdersSubmitHandler = async () => {        
        let filtered = orders.filter((order) => order.status === OrderStatus.new)
        setFilteredOrders([...filtered]);
    };

    const onClickSentOrdersSubmitHandler = () => {
        let filtered = orders.filter((order) => order.status === OrderStatus.sent);
        setFilteredOrders([...filtered]);
    };

    const onClickReceivedOrdersSubmitHandler = () => {
        let filtered = orders.filter((order) => order.status === OrderStatus.received);
        setFilteredOrders([...filtered]);
    };

    const onClickArchivedOrdersSubmitHandler = () => {
        let filtered = orders.filter((order) => order.status === OrderStatus.archived);
        setFilteredOrders([...filtered]);
    };

    const onClickAllOrdersSubmitHandler = () => {
        let filtered = [...orders];
        setFilteredOrders([...filtered]);
    };

    return (
        <div className="Cart-container">
            <div className="wrapper">
                <div className="main-container">
                    <div className="main-header anim">
                        <p className='main-header anim text'>ORDERS:</p>
                        <section className='orders-buttons'>
                            <button type='submit' className='orders-buttons-get-new' onClick={onClickNewOrdersSubmitHandler}>NEW</button>
                            <button type='submit' className='orders-buttons-get-sent' onClick={onClickSentOrdersSubmitHandler}>SENT</button>
                            <button type='submit' className='orders-buttons-get-received' onClick={onClickReceivedOrdersSubmitHandler}>RECEIVED</button>
                            <button type='submit' className='orders-buttons-get-archived' onClick={onClickArchivedOrdersSubmitHandler}>ARCHIVED</button>
                            <button type='submit' className='orders-buttons-get-all' onClick={onClickAllOrdersSubmitHandler}>ALL</button>
                        </section>
                    </div>
                    <div className='orders-list'>
                        <ul>

                            {filteredOrders?.map((order) => {
                                return (<OrderCard
                                    key={v4()}
                                    order={order}
                                    id={order.id}
                                    orderedProducts={order.orderedProducts}
                                    status={order.status}
                                    totalPrice={order.totalPrice}
                                    user={order.user} />)
                            })}

                        </ul>
                    </div>
                    {filteredOrders.length === 0 && <h3 className='empty-order-list'>You don't have such orders!</h3>}
                </div>
            </div>
        </div >
    );
};

export default Orders;