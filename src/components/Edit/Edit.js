import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './Edit.css';
import { editProduct, uploadImage } from "../../services/productService";
import { useParams } from "react-router";
import { useProductsContext } from "../../contexts/ProductsContext";
import { useModalContentContext } from "../../contexts/ModalContentContext";
import ModalConfirmation from "../ModalConfirmation";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showModal, setShowModal } = useModalContentContext();
    const { productsToDisplay } = useProductsContext();
    const [currentProduct, setCurrentProduct] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [price, setPrice] = useState(null);
    const [brand, setBrand] = useState(null);
    const [careAbout, setCareAbout] = useState(null);
    const [productType, setProductType] = useState(null);
    const [skinType, setSkinType] = useState(null);
    let [isUploaded, setIsUploaded] = useState(true);


    useEffect(() => {

        let currentItem = productsToDisplay.filter((product) => product.id === id)[0];
        setCurrentProduct(currentItem);
        setName(currentItem.name);
        setDescription(currentItem.description);
        setImageUrl(currentItem.imageUrl);
        setPrice(currentItem.price);
        setBrand(currentItem.brand);
        setCareAbout(currentItem.careAbout);
        setProductType(currentItem.productType);
        setSkinType(currentItem.skinType);
    }, []);



    const editProductSubmitHandler = (e) => {
        e.preventDefault();
        const { editedName, editedDescription, editedPrice, editedBrand, editedCareAbout, editedProductType, editedSkinType } = Object.fromEntries(new FormData(e.currentTarget));

        editProduct(currentProduct.id, editedName, editedDescription, editedPrice, editedBrand, editedCareAbout, editedProductType, editedSkinType, imageUrl);

        e.currentTarget.reset();
        navigate('/body');
    };

    const editUploadImageHandler = (e) => {
        e.preventDefault();
        uploadImage(imageUrl, setImageUrl, setIsUploaded);
    };

    return (
        <section id="edit-page" className="edit edit-section">
            <form id="edit-form" className='edit-section-form' method="POST" onSubmit={editProductSubmitHandler}>
                <fieldset>
                    <legend>Edit current product</legend>
                    <p className="field edit-section-form-fieldset-p-name">
                        <label htmlFor="name">Name:</label>
                        <span className="input">
                            <input type="text" name="editedName" id="name" placeholder="Name" defaultValue={name} />
                        </span>
                    </p>
                    <p className="field edit-section-form-fieldset-p-description">
                        <label htmlFor="description">Description:</label>
                        <span className="input">
                            <textarea name="editedDescription" id="description" placeholder="Description" defaultValue={description} />
                        </span>
                    </p>
                    <p className="field edit-section-form-fieldset-p-imageFile">
                        <label htmlFor="imageFile">Image file:</label>
                        <span className="input">
                            <section>
                                <input type="file" name="imageFile" id="imageFile" defaultValue={imageUrl} onChange={
                                    (e) => {
                                        setImageUrl(e.currentTarget.files[0])
                                        setIsUploaded(false);
                                        console.log('ImageUrl is set')
                                    }} />
                                {!imageUrl && <span></span>}
                                {imageUrl && !isUploaded && <span className="image-choosen-file-text">{'Image file has been chosen!'}</span>}
                                {imageUrl && isUploaded && <span className="image-choosen-file-text">{'Image file has been uploaded!'}</span>}
                            </section>
                            <button className={`${isUploaded && 'disabled'}`} type="submit" onClick={editUploadImageHandler}>Upload to server</button>
                        </span>
                    </p>
                    <p className="field edit-section-form-fieldset-p-price">
                        <label htmlFor="price">Price:</label>
                        <span className="input">
                            <input type="text" name="editedPrice" id="price" placeholder="Price" defaultValue={price} />
                        </span>
                    </p>
                    <p className="field edit-section-form-fieldset-p-brand">
                        <label htmlFor="brand">Brand:</label>
                        <span className="input">
                            <select id="brand" name="editedBrand">
                                <option value={brand}>{brand && `${brand.charAt(0).toUpperCase() + brand.slice(1)}`}</option>
                                <option value="avon">Avon</option>
                                <option value="garnier">Garnier</option>
                                <option value="loreal">Loreal</option>
                                <option value="oriflame">Oriflame</option>
                            </select>
                        </span>
                    </p>
                    <p className="field edit-section-form-fieldset-p-careAbout">
                        <label htmlFor="careAbout">Care type:</label>
                        <span className="input">
                            <select id="careAbout" name="editedCareAbout">
                                <option value={careAbout}>{careAbout && `${careAbout.charAt(0).toUpperCase() + careAbout.slice(1)}`}</option>
                                <option value="wholeBody">Whole body</option>
                                <option value="face">Face</option>
                                <option value="hair">Hair</option>
                                <option value="hands">Hands</option>
                            </select>
                        </span>
                    </p>
                    <p className="field edit-section-form-fieldset-p-productType">
                        <label htmlFor="productType">Product type:</label>
                        <span className="input">
                            <select id="productType" name="editedProductType">
                                <option value={productType}>{productType && `${productType.charAt(0).toUpperCase() + productType.slice(1)}`}</option>
                                <option value="cream">Cream</option>
                                <option value="lotion">Lotion</option>
                                <option value="mask">Mask</option>
                                <option value="oil">Oil</option>
                                <option value="shampoo">Shampoo</option>
                                <option value="wash">Wash</option>
                            </select>
                        </span>
                    </p>
                    <p className="field edit-section-form-fieldset-p-skinType">
                        <label htmlFor="skinType">Skin type:</label>
                        <span className="input">
                            <select id="skinType" name="editedSkinType">
                                <option value={skinType}>{skinType && `${skinType.charAt(0).toUpperCase() + skinType.slice(1)}`}</option>
                                <option value="dry">Dry</option>
                                <option value="moist">Moist</option>
                                <option value="normal">Normal</option>
                            </select>
                        </span>
                    </p>
                    <input className={`button submit edit-section-form-fieldset-button ${!isUploaded && 'disabled'}`} type="submit" disabled={!isUploaded} value="Add" />
                </fieldset>
            </form>            
        </section>
    )
};

export default Edit;