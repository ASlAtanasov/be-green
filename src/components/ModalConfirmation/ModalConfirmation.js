import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { string, object, arrayOf, func } from 'prop-types';
import { deleteItemFromServer, getAll } from '../../services/productService';
import "./ModalConfirmation.css";
import { useModalContentContext } from '../../contexts/ModalContentContext';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import { useProductsContext } from '../../contexts/ProductsContext';


const ModalConfirmation = (props) => {
    const {  setShowModalConfirmation } = useModalContentContext();
    const { orders, setOrders, orderToDelete, setFilteredOrders } = useOrderedProductsContext();
    const { products, setProducts, setProductsToDisplay, productToDelete } = useProductsContext();
    const { itemtodelete, text } = props;

    const onClickConfirmationHandler = async () => {

        await setShowModalConfirmation(false);

        if (itemtodelete === 'order') {
            await deleteItemFromServer(orderToDelete.id, 'orders/');

            let newOrders = orders.filter((order) => order.id !== orderToDelete.id)
            await setOrders([...newOrders]);
            await setFilteredOrders([...newOrders]);

            alert(`Order is deleted successfully`);
        } else if (itemtodelete === 'product') {
            await deleteItemFromServer(productToDelete.id, 'products/', productToDelete.imageName, 'images/');

            let newProducts = products.filter((product) => product.id !== productToDelete.id);
            await setProducts([...newProducts]);
            await setProductsToDisplay([...newProducts]);

            alert(`Product and image are deleted successfully`);
        };
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='modal-title-text'>
                    Need confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><span className='modal-item-description-text'>{text}</span></p>
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-confirmation' variant="primary" onClick={onClickConfirmationHandler}>
                    YES
                </Button>
                <Button className='button-deny' onClick={props.onHide}>NO</Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalConfirmation.propTypes = {
    item: string,
    text: string,
};

ModalConfirmation.defaultProps = {
    id: null,
    text: null,
};

export default ModalConfirmation;