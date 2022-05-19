import React, { useState } from "react";
import './Create.css';
import { uploadImageHandler, createProductSubmitHandler } from "../../services/productService";

const Create = () => {
    const [imageUrl, setImageUrl] = useState(null);
    let [isUploaded, setIsUploaded] = useState(false);

    return (
        <section id="create-page" className="create create-section">
            <form id="create-form" className='create-section-form' method="POST" onSubmit={createProductSubmitHandler(imageUrl, setIsUploaded)}>
                <fieldset>
                    <legend>Add new product</legend>
                    <p className="field create-section-form-fieldset-p-name">
                        <label htmlFor="name">Name:</label>
                        <span className="input">
                            <input type="text" name="name" id="name" placeholder="Name" />
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-description">
                        <label htmlFor="description">Description:</label>
                        <span className="input">
                            <textarea name="description" id="description" placeholder="Description" />
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-imageFile">
                        <label htmlFor="imageFile">Image file:</label>
                        <span className="input">
                            <input type="file" name="imageFile" id="imageFile" onChange={
                                (e) => {
                                    setImageUrl(e.currentTarget.files[0])
                                    console.log('ImageUrl is set')
                                }} />
                            <button type="submit" onClick={uploadImageHandler(imageUrl, setImageUrl, setIsUploaded)} disabled={isUploaded}>Upload to firebase</button>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-price">
                        <label htmlFor="price">Price:</label>
                        <span className="input">
                            <input type="number" name="price" id="price" placeholder="Price" />
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-brand">
                        <label htmlFor="brand">Brand:</label>
                        <span className="input">
                            <select id="brand" name="brand">
                                <option value="avon">Avon</option>
                                <option value="garnier">Garnier</option>
                                <option value="loreal">Loreal</option>
                                <option value="oriflame">Oriflame</option>
                            </select>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-careAbout">
                        <label htmlFor="careAbout">Care type:</label>
                        <span className="input">
                            <select id="careAbout" name="careAbout">
                                <option value="wholeBody">Whole body</option>
                                <option value="face">Face</option>
                                <option value="hair">Hair</option>
                                <option value="hands">Hands</option>
                            </select>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-productType">
                        <label htmlFor="productType">Product type:</label>
                        <span className="input">
                            <select id="productType" name="productType">
                                <option value="cream">Cream</option>
                                <option value="lotion">Lotion</option>
                                <option value="mask">Mask</option>
                                <option value="oil">Oil</option>
                                <option value="shampoo">Shampoo</option>
                                <option value="wash">Wash</option>
                            </select>
                        </span>
                    </p>
                    <p className="field create-section-form-fieldset-p-skinType">
                        <label htmlFor="skinType">Skin type:</label>
                        <span className="input">
                            <select id="skinType" name="skinType">
                                <option value="dry">Dry</option>
                                <option value="moist">Moist</option>
                                <option value="normal">Normal</option>
                            </select>
                        </span>
                    </p>
                    <input className="button submit create-section-form-fieldset-button" type="submit" disabled={!isUploaded} value="Add" />
                </fieldset>
            </form>
        </section>
    )
};

export default Create;