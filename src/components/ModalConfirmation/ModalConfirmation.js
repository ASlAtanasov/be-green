import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { string, object, arrayOf, func } from 'prop-types';
import { deleteItemFromServer, getAll } from '../../services/productService';
import "./ModalConfirmation.css";
import { useModalContentContext } from '../../contexts/ModalContentContext';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';

const ModalConfirmation = (props) => {
    const {showModal, setShowModal} = useModalContentContext();
    const {orders, setOrders, setFilteredOrders} = useOrderedProductsContext();
    const { id, text } = props;
    const navigate = useNavigate();

    const onClickConfirmationHandler = async (e) => {
        await deleteItemFromServer(id);
        await setShowModal(false);
        let newOrders = orders.filter((order) => order.id !== id)
        await setOrders([...newOrders]);
        await setFilteredOrders([...newOrders]);

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
    id: string.isRequired,
    text: string.isRequired,
};

ModalConfirmation.defaultProps = {
    id: null,
    text: null,
};

export default ModalConfirmation;