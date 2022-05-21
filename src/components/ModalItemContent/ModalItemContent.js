import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { string, object, arrayOf } from 'prop-types';
import "./ModalItemContent.css";

const ModalItemContent = (props) => {

    let [brand, careAbout, description, id, imageUrl, name, price, productType, skinType] = Object.values(props.item);

        // if(brand) {
        //     const brandName = brand?.slice(0,1);
        //     console.log(brandName);
        // }
   

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='modal-title-text'>
                    Detailed information about the product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className='modal-body-section'>
                    <section className='modal-image'>
                        <img src={`${imageUrl}`} />
                    </section>
                    <section className='modal-item-description'>
                        <h4>{name}</h4>
                        <p><span className='modal-item-description-text'>{description}</span></p>
                        <p><span className='modal-item-description-text'>Produced by {brand && brand.toUpperCase()}</span></p>
                        <p><span className='modal-item-description-text'>Useful for your {careAbout}</span></p>
                        <p><span className='modal-item-description-text'>Product type: {productType}</span></p>
                        <p><span className='modal-item-description-text'>Appropriate for {skinType} skin</span></p>
                        <p><span className='modal-item-description-text'>Price: {price} lv.</span></p>
                    </section>
                </section>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalItemContent.propTypes = {
    name: string,
    description: string,
    icon: string,
    price: string,
    brand: string,
    careAbout: string,
    imageUrl: string,
    productType: string,
    skinType: string
};

ModalItemContent.defaultProps = {
    name: null,
    description: null,
    icon: null,
    price: null,
    brand: null,
    careAbout: null,
    imageUrl: null,
    productType: null,
    skinType: null
};

export default ModalItemContent;